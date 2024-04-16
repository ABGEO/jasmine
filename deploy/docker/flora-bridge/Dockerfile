FROM golang:1.22.1-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY packages/flora-bridge packages/flora-bridge

RUN CGO_ENABLED=0 GOOS=linux go build -v ./packages/flora-bridge

FROM alpine:edge

LABEL org.opencontainers.image.title="Jasmine Flora Bridge"
LABEL org.opencontainers.image.authors="Temuri Takalandze <me@abgeo.dev>"
LABEL org.opencontainers.image.source="https://github.com/ABGEO/jasmine/tree/main/packages/flora-bridge"

WORKDIR /app

RUN addgroup --system --gid 1001 flora-bridge \
    && adduser --system --uid 1001 flora-bridge

COPY --from=builder --chown=flora-bridge:flora-bridge /app/flora-bridge .
# @todo: remove this once Viper is fixed.
COPY --chown=flora-bridge:flora-bridge packages/flora-bridge/example.env .env

EXPOSE 8080

USER flora-bridge

ENTRYPOINT ["/app/flora-bridge"]
