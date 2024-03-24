package broker

import (
	"fmt"
	"os"
	"time"

	"github.com/abgeo/jasmine/packages/flora-bridge/config"
	mqtt "github.com/eclipse/paho.mqtt.golang"
)

const connectionTimeout = 5 * time.Second

func NewBroker(conf *config.Config) (mqtt.Client, error) {
	hostname, err := os.Hostname()
	if err != nil {
		return nil, fmt.Errorf("unable to get hostname: %w", err)
	}

	opts := mqtt.NewClientOptions().
		SetAutoReconnect(true).
		AddBroker(conf.MQTT.Broker).
		SetClientID(fmt.Sprintf("%s@%s", conf.MQTT.User, hostname)).
		SetUsername(conf.MQTT.User).
		SetPassword(conf.MQTT.Password)

	client := mqtt.NewClient(opts)
	if token := client.Connect(); token.WaitTimeout(connectionTimeout) && token.Error() != nil {
		return nil, fmt.Errorf("unable to connect to MQTT server: %w", token.Error())
	}

	return client, nil
}
