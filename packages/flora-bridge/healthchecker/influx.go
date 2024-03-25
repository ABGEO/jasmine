package healthchecker

import (
	"github.com/abgeo/jasmine/packages/flora-bridge/config"
	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"github.com/tavsec/gin-healthcheck/checks"
)

const timeout = 10

func NewInfluxHealthChecker(conf *config.Config) *checks.InfluxV2Check {
	client := influxdb2.NewClient(conf.InfluxDB.ServerURL, conf.InfluxDB.Token)

	return checks.NewInfluxV2Check(timeout, client)
}
