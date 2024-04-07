#pragma once

#include "mqtt_client.h"

int mqtt_send_reading(esp_mqtt_client_handle_t client, char *reading_type,
                      char *reading);
