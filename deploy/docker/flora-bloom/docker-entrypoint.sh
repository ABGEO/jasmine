#!/usr/bin/env sh

set -e

grep -rwl ".next" -e "_NEXT_PUBLIC_GRAFANA_URL_" | xargs -r sed -i "s!_NEXT_PUBLIC_GRAFANA_URL_!${NEXT_PUBLIC_GRAFANA_URL}!g"
grep -rwl ".next" -e "_NEXT_PUBLIC_FLORA_BRIDGE_URL_" | xargs -r sed -i "s!_NEXT_PUBLIC_FLORA_BRIDGE_URL_!${NEXT_PUBLIC_FLORA_BRIDGE_URL}!g"
grep -rwl ".next" -e "_NEXT_PUBLIC_S3_URL_" | xargs -r sed -i "s!_NEXT_PUBLIC_S3_URL_!${NEXT_PUBLIC_S3_URL}!g"

exec "$@"
