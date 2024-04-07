#include "esp_log.h"
#include "esp_netif_sntp.h"

static const char *TAG = "sntp";

esp_err_t setup_sntp(void) {
  const int retry_count = 15;
  int retry = 0;

  ESP_LOGI(TAG, "[sntp_init] Initializing and starting SNTP");

  esp_sntp_config_t config =
      ESP_NETIF_SNTP_DEFAULT_CONFIG(CONFIG_SNTP_TIME_SERVER);
  esp_err_t res = esp_netif_sntp_init(&config);
  if (res != ESP_OK) {
    return res;
  }

  while (esp_netif_sntp_sync_wait(2000 / portTICK_PERIOD_MS) ==
             ESP_ERR_TIMEOUT &&
         ++retry < retry_count) {
    ESP_LOGI(TAG, "[sntp_init] Waiting for system time to be set... (%d/%d)",
             retry, retry_count);

    if (retry + 1 == retry_count) {
      return ESP_ERR_TIMEOUT;
    }
  }

  ESP_LOGI(TAG, "[sntp_init] SNTP has been initialized");

  return ESP_OK;
}
