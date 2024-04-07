#include "include/mqtt.h"
#include <sys/time.h>

int mqtt_send_reading(esp_mqtt_client_handle_t client, char *reading_type,
                      char *reading) {
  time_t now;
  struct tm timeinfo;
  char reading_buf[100];
  char topic_buf[100];
  char strftime_buf[64];

  time(&now);
  localtime_r(&now, &timeinfo);
  strftime(strftime_buf, sizeof(strftime_buf), "%Y-%m-%dT%H:%M:%SZ", &timeinfo);

  snprintf(reading_buf, sizeof(reading_buf), "{\"time\":\"%s\",\"value\":%s}",
           strftime_buf, reading);
  snprintf(topic_buf, sizeof(topic_buf), "measurement/%s/%s", reading_type,
           CONFIG_PLANT_ID);

  return esp_mqtt_client_publish(client, topic_buf, reading_buf, 0, 1, 0);
}
