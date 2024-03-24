package app

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"github.com/abgeo/jasmine/packages/flora-bridge/config"
	"github.com/abgeo/jasmine/packages/flora-bridge/processor"
	mqtt "github.com/eclipse/paho.mqtt.golang"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type Params struct {
	fx.In

	Server     *http.Server
	Processors []processor.Processor `group:"processors"`
	Config     *config.Config
	Logger     *zap.Logger
	MQTTClient mqtt.Client
}

func Run(params Params, lc fx.Lifecycle) error {
	const (
		defaultQoS = 2
		quiesce    = 250
	)

	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			go func() {
				for _, proc := range params.Processors {
					params.Logger.Debug(
						"registering processor",
						zap.String("topic", proc.Topic()),
					)

					params.MQTTClient.Subscribe(
						fmt.Sprintf("$share/flora-bridge-%s/%s", params.Config.Env, proc.Topic()),
						defaultQoS,
						proc.Handler,
					)
				}
			}()

			go func() {
				params.Logger.Info(
					"starting HTTP server",
					zap.String("address", params.Config.Server.ListenAddr),
					zap.String("port", params.Config.Server.Port),
				)

				if err := params.Server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
					params.Logger.Fatal("unable to start HTTP Server", zap.Error(err))
				}
			}()

			return nil
		},
		OnStop: func(ctx context.Context) error {
			params.Logger.Info("shutting down HTTP server")

			if err := params.Server.Shutdown(ctx); err != nil {
				return fmt.Errorf("failed to shutdown server: %w", err)
			}

			params.Logger.Info("disconnecting MQTT client")
			params.MQTTClient.Disconnect(quiesce)

			return nil
		},
	})

	return nil
}
