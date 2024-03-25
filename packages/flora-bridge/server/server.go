package server

import (
	"fmt"
	"net"
	"net/http"
	"time"

	"github.com/abgeo/jasmine/packages/flora-bridge/config"
	"github.com/abgeo/jasmine/packages/flora-bridge/route"
	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
	healthcheck "github.com/tavsec/gin-healthcheck"
	"github.com/tavsec/gin-healthcheck/checks"
	healthcheckConfig "github.com/tavsec/gin-healthcheck/config"
	"go.uber.org/zap"
)

func New(
	env string,
	routes []route.IRoute,
	healthCheckers []checks.Check,
	conf *config.Config,
	logger *zap.Logger,
) (*http.Server, error) {
	if env == "prod" {
		gin.SetMode(gin.ReleaseMode)
	}

	if env == "test" {
		gin.SetMode(gin.TestMode)
	}

	engine := gin.New()
	engine.ContextWithFallback = true

	if err := engine.SetTrustedProxies(conf.Server.TrustedProxies); err != nil {
		return nil, fmt.Errorf("unable to set trusted proxies: %w", err)
	}

	engine.Use(ginzap.Ginzap(logger, time.RFC3339, true))
	engine.Use(ginzap.RecoveryWithZap(logger, true))

	err := healthcheck.New(engine, healthcheckConfig.DefaultConfig(), healthCheckers)
	if err != nil {
		return nil, fmt.Errorf("unable to setup healthcheck: %w", err)
	}

	route.RegisterRoutes(engine, routes...)

	return &http.Server{
		Addr:              net.JoinHostPort(conf.Server.ListenAddr, conf.Server.Port),
		Handler:           engine,
		ReadHeaderTimeout: 0,
	}, nil
}
