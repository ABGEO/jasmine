#include "buzzer.h"
#include "esp_err.h"
#include "esp_event.h"
#include "esp_log.h"
#include "esp_wifi.h"
#include "nvs_flash.h"
#include "ui/ui.h"
#include <esp_adc/adc_oneshot.h>

static const char *TAG = "flora_node";

esp_err_t setup_tasks(adc_oneshot_unit_handle_t adc1_handle);

esp_err_t setup_adc_oneshot_unit(adc_oneshot_unit_handle_t *ret_unit);

esp_err_t setup_i2c_bus();

esp_err_t setup_wifi();

esp_err_t setup_sntp(void);

esp_err_t setup_ui(void);

esp_err_t setup_navigation(void);

esp_err_t nvs_init() {
  esp_err_t ret = nvs_flash_init();
  if (ret == ESP_ERR_NVS_NO_FREE_PAGES ||
      ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
    ret = nvs_flash_erase();
    if (ret != ESP_OK) {
      return ret;
    }

    return nvs_flash_init();
  }

  return ret;
}

void app_main(void) {
  adc_oneshot_unit_handle_t adc1_handle = NULL;

  ESP_LOGI(TAG, "[app_main] Startup...");
  ESP_LOGI(TAG, "[app_main] Free memory: %" PRIu32 " bytes",
           esp_get_free_heap_size());
  ESP_LOGI(TAG, "[app_main] IDF version: %s", esp_get_idf_version());

  ESP_ERROR_CHECK(setup_adc_oneshot_unit(&adc1_handle));

  ESP_ERROR_CHECK(setup_i2c_bus());
  ESP_ERROR_CHECK(setup_ui());

  ESP_ERROR_CHECK(buzzer_init());

  ESP_ERROR_CHECK(setup_navigation());

  // Initialize NVS.
  ESP_ERROR_CHECK(nvs_init());

  // Initialize NETIF.
  ESP_ERROR_CHECK(esp_netif_init());

  // Initialize Event Loop.
  ESP_ERROR_CHECK(esp_event_loop_create_default());

  // Initialize WiFi.
  ESP_ERROR_CHECK(setup_wifi());

  // Initialize SNTP.
  ESP_ERROR_CHECK(setup_sntp());

  // Setup tasks.
  ESP_ERROR_CHECK(setup_tasks(adc1_handle));

  _ui_screen_change(&ui_MainScreen, LV_SCR_LOAD_ANIM_NONE, 0, 0, NULL);
}
