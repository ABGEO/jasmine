package processor

import (
	"context"
	"encoding/json"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/abgeo/jasmine/packages/flora-bridge/config"
	"github.com/abgeo/jasmine/packages/flora-bridge/model"
	mqtt "github.com/eclipse/paho.mqtt.golang"
	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"go.uber.org/zap"
)

type MeasurementProcessor struct {
	config *config.Config
	logger *zap.Logger

	influxClient influxdb2.Client
}

func NewMeasurementProcessor(conf *config.Config, logger *zap.Logger) *MeasurementProcessor {
	client := influxdb2.NewClient(
		conf.InfluxDB.ServerURL,
		conf.InfluxDB.Token,
	)

	return &MeasurementProcessor{
		config:       conf,
		logger:       logger,
		influxClient: client,
	}
}

func (proc *MeasurementProcessor) Topic() string {
	return "measurement/+/+"
}

func (proc *MeasurementProcessor) Handler(_ mqtt.Client, msg mqtt.Message) {
	ctx := context.Background()

	proc.logger.Info(
		"new measurement received",
		zap.String("topic", msg.Topic()),
		zap.Any("qos", msg.Qos()),
		zap.Uint16("message_id", msg.MessageID()),
		zap.Bool("duplicate", msg.Duplicate()),
		zap.Bool("retained", msg.Retained()),
		zap.ByteString("payload", msg.Payload()),
	)

	readings, err := proc.parseSensorReading(msg.Payload())
	if err != nil {
		proc.logger.Error(
			"unable to parse sensor readings",
			zap.String("topic", msg.Topic()),
			zap.Uint16("message_id", msg.MessageID()),
			zap.Error(err),
		)

		return
	}

	err = proc.storeSensorReading(ctx, msg.Topic(), readings)
	if err != nil {
		proc.logger.Error(
			"unable to store sensor readings",
			zap.String("topic", msg.Topic()),
			zap.Uint16("message_id", msg.MessageID()),
			zap.Error(err),
		)

		return
	}
}

func (proc *MeasurementProcessor) parseSensorReading(rawData []byte) (*model.SensorReading, error) {
	var data model.SensorReading

	if err := json.Unmarshal(rawData, &data); err != nil {
		return nil, fmt.Errorf("unable to unmarshal sensor readings: %w", err)
	}

	return &data, nil
}

func (proc *MeasurementProcessor) storeSensorReading(
	ctx context.Context,
	topic string,
	data *model.SensorReading,
) error {
	measurement, pid := proc.parseTopic(topic)
	writeAPI := proc.influxClient.WriteAPIBlocking(
		proc.config.InfluxDB.Org,
		proc.config.InfluxDB.Bucket,
	)
	point := influxdb2.NewPointWithMeasurement(measurement).
		SetTime(time.Now()).
		AddTag("pid", pid).
		AddField("value", data.Value)

	if err := writeAPI.WritePoint(ctx, point); err != nil {
		return fmt.Errorf("unable to write pont: %w", err)
	}

	return nil
}

func (proc *MeasurementProcessor) parseTopic(topic string) (string, string) {
	reg := regexp.MustCompile(`[^a-zA-Z0-9]+`)
	namespace := strings.Split(topic, "/")

	measurement := reg.ReplaceAllString(strings.ToLower(namespace[1]), "_")
	pid := namespace[2]

	return measurement, pid
}
