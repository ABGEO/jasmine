package config

import (
	"fmt"

	"github.com/mcuadros/go-defaults"
	"github.com/spf13/viper"
)

type ServerConfig struct {
	ListenAddr     string   `mapstructure:"SERVER_ADDR" default:"0.0.0.0"`
	Port           string   `mapstructure:"SERVER_PORT" default:"8080"`
	TrustedProxies []string `mapstructure:"TRUSTED_PROXIES"`
}

type InfluxDBConfig struct {
	ServerURL string `mapstructure:"INFLUX_URL" default:"http://127.0.0.1:8086"`
	Org       string `mapstructure:"INFLUX_ORG"`
	Token     string `mapstructure:"INFLUX_TOKEN"`
	Bucket    string `mapstructure:"INFLUX_BUCKET"`
}

type MQTTConfig struct {
	Broker   string `mapstructure:"MQTT_BROKER" default:"tcp://127.0.0.1:1883"`
	User     string `mapstructure:"MQTT_USER"`
	Password string `mapstructure:"MQTT_PASSWORD"`
}

type DatabaseConfig struct {
	Host     string `mapstructure:"DB_HOST"`
	User     string `mapstructure:"DB_USER"`
	Password string `mapstructure:"DB_PASSWORD"`
	Database string `mapstructure:"DB_NAME"`
	Port     string `mapstructure:"DB_PORT"`
}

type Config struct {
	Env string `mapstructure:"ENV" default:"local"`

	InfluxDB InfluxDBConfig `mapstructure:",squash"`
	Server   ServerConfig   `mapstructure:",squash"`
	MQTT     MQTTConfig     `mapstructure:",squash"`
	Database DatabaseConfig `mapstructure:",squash"`
}

func New() (*Config, error) {
	conf := new(Config)

	viper.AddConfigPath("./")
	viper.AddConfigPath("packages/flora-bridge/")
	viper.SetConfigName(".env")
	viper.SetConfigType("env")

	viper.AllowEmptyEnv(true)
	viper.AutomaticEnv()

	defaults.SetDefaults(conf)

	if err := viper.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("failed to read config file: %w", err)
	}

	if err := viper.Unmarshal(conf); err != nil {
		return nil, fmt.Errorf("failed to unmarshal config: %w", err)
	}

	return conf, nil
}
