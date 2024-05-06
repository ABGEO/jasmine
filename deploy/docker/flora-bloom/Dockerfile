FROM node:18-alpine AS base

FROM base AS deps

# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY packages/flora-bloom/package.json packages/flora-bloom/yarn.lock .

RUN yarn --frozen-lockfile \
    # https://nextjs.org/docs/messages/sharp-missing-in-production
    && yarn add sharp@0.32.6

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY packages/flora-bloom .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PRIVATE_STANDALONE 1
#ENV NEXT_SHARP_PATH "/app/node_modules/sharp"

# Set placeholders for public ENV variables to replace.
ENV NEXT_PUBLIC_GRAFANA_URL "_NEXT_PUBLIC_GRAFANA_URL_"
ENV NEXT_PUBLIC_FLORA_BRIDGE_URL "_NEXT_PUBLIC_FLORA_BRIDGE_URL_"
ENV NEXT_PUBLIC_S3_URL "_NEXT_PUBLIC_S3_URL_"

RUN yarn run build

FROM base AS runner

LABEL org.opencontainers.image.title="Jasmine Flora Bloom"
LABEL org.opencontainers.image.authors="Temuri Takalandze <me@abgeo.dev>"
LABEL org.opencontainers.image.source="https://github.com/ABGEO/jasmine/tree/main/packages/flora-bloom"

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
#ENV NEXT_SHARP_PATH "/app/node_modules/sharp"
ENV PORT 3000

RUN addgroup --system --gid 1001 flora-bloom \
    && adduser --system --uid 1001 flora-bloom

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown flora-bloom:flora-bloom .next

COPY --from=builder --chown=flora-bloom:flora-bloom /app/.next/standalone .
COPY --from=builder --chown=flora-bloom:flora-bloom /app/.next/static ./.next/static

COPY deploy/docker/flora-bloom/docker-entrypoint.sh /

USER flora-bloom

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD HOSTNAME="0.0.0.0" node server.js
