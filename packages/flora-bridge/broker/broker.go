package broker

import (
	"fmt"
	"time"

	"github.com/abgeo/jasmine/packages/flora-bridge/config"
	mqtt "github.com/eclipse/paho.mqtt.golang"
)

const connectionTimeout = 5 * time.Second

func NewBroker(conf *config.Config) (mqtt.Client, error) {
	opts := mqtt.NewClientOptions().
		SetAutoReconnect(true).
		AddBroker(conf.MQTT.Broker).
		SetClientID(conf.MQTT.User).
		SetUsername(conf.MQTT.User).
		SetPassword(conf.MQTT.Password)

	client := mqtt.NewClient(opts)
	if token := client.Connect(); token.WaitTimeout(connectionTimeout) && token.Error() != nil {
		return nil, fmt.Errorf("unable to connect to MQTT server: %w", fmt.Errorf("unable to update User: %w", token.Error()))
	}

	return client, nil
}
