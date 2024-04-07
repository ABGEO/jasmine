#include "MQ135.h"
#include "am2302_rmt.h"
#include "esp_err.h"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "include/mqtt.h"
#include "lvgl.h"
#include "soil_moisture.h"
#include "ui/ui.h"
#include <bh1750.h>
#include <mqtt_client.h>
#include <ultrasonic.h>

static const char *TAG = "flora_node:task";

adc_oneshot_unit_handle_t adc1_handle = NULL;
QueueHandle_t xQueueAM2302Humidity, xQueueAM2302Temperature, xQueueSoilMoisture,
    xQueueMQ135, xQueueBH1750, xQueueUltrasonic;

static void mqtt5_event_handler(void *handler_args, esp_event_base_t base,
                                int32_t event_id, void *event_data) {
  bool connected;

  switch ((esp_mqtt_event_id_t)event_id) {
  case MQTT_EVENT_CONNECTED:
    connected = true;
    lv_event_send(ui_MQTTStatusIcon, LV_EVENT_REFRESH, &connected);
    break;
  case MQTT_EVENT_DISCONNECTED:
    connected = false;
    lv_event_send(ui_MQTTStatusIcon, LV_EVENT_REFRESH, &connected);
    break;
  default:
    break;
  }
}

esp_mqtt_client_handle_t mqtt5_app_start(void) {
  esp_mqtt_client_config_t mqtt5_cfg = {
      .broker.address.uri = CONFIG_MQTT_BROKER_URL,
      .session.protocol_ver = MQTT_PROTOCOL_V_5,
      // @todo: add PID suffix.
      .credentials.client_id = "flora-node",
      // @todo: move credentials to config.
      .credentials.username = "flora-node",
      .credentials.authentication.password = "password",
  };

  esp_mqtt_client_handle_t client = esp_mqtt_client_init(&mqtt5_cfg);

  esp_mqtt_client_register_event(client, ESP_EVENT_ANY_ID, mqtt5_event_handler,
                                 NULL);
  esp_mqtt_client_start(client);

  return client;
}

void task_read_am2302(void *pvParameters) {
  const TickType_t xDelay = 10000 / portTICK_PERIOD_MS;

  float temperature_reading;
  float humidity_reading;
  am2302_config_t am2302_config = {
      .gpio_num = CONFIG_PERIPHERAL_AM2302_GPIO,
  };
  am2302_rmt_config_t rmt_config = {
      .clk_src = RMT_CLK_SRC_DEFAULT,
  };
  am2302_handle_t sensor = NULL;

  ESP_ERROR_CHECK(am2302_new_sensor_rmt(&am2302_config, &rmt_config, &sensor));

  for (;;) {
    vTaskDelay(xDelay);

    esp_err_t ret =
        am2302_read_temp_humi(sensor, &temperature_reading, &humidity_reading);
    if (ret == ESP_OK) {
      ESP_LOGI(TAG, "[task_read_am2302] Temperature: %.1f °C",
               temperature_reading);
      ESP_LOGI(TAG, "[task_read_am2302] Humidity: %.1f %%", humidity_reading);

      xQueueSend(xQueueAM2302Temperature, &temperature_reading, portMAX_DELAY);
      xQueueSend(xQueueAM2302Humidity, &humidity_reading, portMAX_DELAY);
    } else {
      ESP_LOGE(TAG, "[task_read_am2302] Unable to get readings: %s",
               esp_err_to_name(ret));
    }
  }

  vTaskDelete(NULL);
}

void task_read_soil_moisture(void *pvParameters) {
  const TickType_t xDelay = 10000 / portTICK_PERIOD_MS;

  uint32_t reading;

  ESP_ERROR_CHECK(soil_moisture_setup(adc1_handle,
                                      CONFIG_PERIPHERAL_SOIL_MOISTURE_ADC1_CH));

  for (;;) {
    vTaskDelay(xDelay);

    reading = soil_moisture_read();

    if (reading >= CONFIG_PERIPHERAL_SOIL_MOISTURE_MIN_THRESHOLD &&
        reading <= CONFIG_PERIPHERAL_SOIL_MOISTURE_MAX_THRESHOLD) {
      ESP_LOGI(TAG, "[task_read_soil_moisture] Raw Data: %lu", reading);
      xQueueSend(xQueueSoilMoisture, &reading, portMAX_DELAY);
    } else {
      ESP_LOGE(TAG, "[task_read_soil_moisture] Invalid Threshold: %lu",
               reading);
    }
  }

  vTaskDelete(NULL);
}

void task_read_mq135(void *pvParameters) {
  const TickType_t xDelay = 10000 / portTICK_PERIOD_MS;

  uint32_t reading;

  ESP_ERROR_CHECK(MQ135_setup(adc1_handle, CONFIG_PERIPHERAL_MQ135_ADC1_CH));

  for (;;) {
    vTaskDelay(xDelay);

    reading = MQ135_read();

    ESP_LOGI(TAG, "[task_read_mq135] Raw Data: %lu", reading);

    xQueueSend(xQueueMQ135, &reading, portMAX_DELAY);
  }

  vTaskDelete(NULL);
}

void task_read_bh1750(void *pvParameters) {
  const TickType_t xDelay = 10000 / portTICK_PERIOD_MS;

  float reading;

  bh1750_handle_t sensor = bh1750_create(I2C_NUM_0, BH1750_I2C_ADDRESS_DEFAULT);

  ESP_ERROR_CHECK(bh1750_power_on(sensor));
  ESP_ERROR_CHECK(bh1750_set_measure_mode(sensor, BH1750_CONTINUE_4LX_RES));

  for (;;) {
    vTaskDelay(xDelay);

    esp_err_t ret = bh1750_get_data(sensor, &reading);
    if (ret == ESP_OK) {
      ESP_LOGI(TAG, "[task_read_bh1750] Illuminance: %.1f Lux", reading);

      xQueueSend(xQueueBH1750, &reading, portMAX_DELAY);
    } else {
      ESP_LOGE(TAG, "[task_read_bh1750] Unable to get readings: %s",
               esp_err_to_name(ret));
    }
  }

  vTaskDelete(NULL);
  ESP_ERROR_CHECK(bh1750_delete(sensor));
}

void task_read_ultrasonic(void *pvParameters) {
  const TickType_t xDelay = 10000 / portTICK_PERIOD_MS;

  uint32_t reading;
  ultrasonic_sensor_t sensor = {
      .trigger_pin = CONFIG_PERIPHERAL_ULTRASONIC_TRIGGER_GPIO,
      .echo_pin = CONFIG_PERIPHERAL_ULTRASONIC_ECHO_GPIO};

  ultrasonic_init(&sensor);

  for (;;) {
    vTaskDelay(xDelay);

    esp_err_t ret = ultrasonic_measure_cm(
        &sensor, CONFIG_PERIPHERAL_ULTRASONIC_MAX_DISTANCE, &reading);
    if (ret == ESP_OK) {
      ESP_LOGI(TAG, "[task_read_ultrasonic] Distance: %lu cm", reading);

      xQueueSend(xQueueUltrasonic, &reading, portMAX_DELAY);
    } else {
      ESP_LOGE(TAG, "[task_read_ultrasonic] Unable to get readings: %s",
               esp_err_to_name(ret));
    }
  }

  vTaskDelete(NULL);
}

void task_process_sensor_readings(void *pvParameters) {
  esp_mqtt_client_handle_t mqtt_client = mqtt5_app_start();

  char reading_buf[100];
  float am2302_temperature_reading = 0.0f;
  float am2302_humidity_reading = 0.0f;
  uint32_t soil_moisture_reading;
  uint32_t mq135_reading;
  float bh1750_reading;
  uint32_t ultrasonic_reading;

  for (;;) {
    vTaskDelay(1);

    if (xQueueReceive(xQueueAM2302Temperature, &am2302_temperature_reading,
                      0) == pdTRUE) {
      ESP_LOGD(TAG,
               "[task_process_sensor_readings] MQ135 Temperature reading "
               "received: %.1f",
               am2302_temperature_reading);

      snprintf(reading_buf, sizeof(reading_buf), "%f",
               am2302_temperature_reading);
      mqtt_send_reading(mqtt_client, "temperature", reading_buf);

      lv_event_send(ui_TemperatureValue, LV_EVENT_REFRESH,
                    &am2302_temperature_reading);
    }

    if (xQueueReceive(xQueueAM2302Humidity, &am2302_humidity_reading, 0) ==
        pdTRUE) {
      ESP_LOGD(TAG,
               "[task_process_sensor_readings] MQ135 Humidity reading "
               "received: %.1f",
               am2302_humidity_reading);

      snprintf(reading_buf, sizeof(reading_buf), "%f", am2302_humidity_reading);
      mqtt_send_reading(mqtt_client, "humidity", reading_buf);

      lv_event_send(ui_HumidityValue, LV_EVENT_REFRESH,
                    &am2302_humidity_reading);
    }

    if (xQueueReceive(xQueueSoilMoisture, &soil_moisture_reading, 0) ==
        pdTRUE) {
      ESP_LOGD(
          TAG,
          "[task_process_sensor_readings] Soil Moisture reading received: %lu",
          soil_moisture_reading);

      float soil_moisture_normalized = soil_moisture_normalization(
          CONFIG_PERIPHERAL_SOIL_MOISTURE_MIN_THRESHOLD,
          CONFIG_PERIPHERAL_SOIL_MOISTURE_MAX_THRESHOLD, soil_moisture_reading);

      snprintf(reading_buf, sizeof(reading_buf), "%f",
               soil_moisture_normalized);
      mqtt_send_reading(mqtt_client, "soil-moisture", reading_buf);

      snprintf(reading_buf, sizeof(reading_buf), "%lu", soil_moisture_reading);
      mqtt_send_reading(mqtt_client, "soil-moisture-raw", reading_buf);

      lv_event_send(ui_SoilMoistureValue, LV_EVENT_REFRESH,
                    &soil_moisture_normalized);
    }

    if (xQueueReceive(xQueueMQ135, &mq135_reading, 0) == pdTRUE) {
      ESP_LOGD(TAG,
               "[task_process_sensor_readings] MQ135 reading received: %lu",
               mq135_reading);

      snprintf(reading_buf, sizeof(reading_buf), "%lu", mq135_reading);
      mqtt_send_reading(mqtt_client, "mq135-raw", reading_buf);
    }

    if (xQueueReceive(xQueueBH1750, &bh1750_reading, 0) == pdTRUE) {
      ESP_LOGD(TAG,
               "[task_process_sensor_readings] BH1750 reading received: %.1f",
               bh1750_reading);

      snprintf(reading_buf, sizeof(reading_buf), "%f", bh1750_reading);
      mqtt_send_reading(mqtt_client, "illuminance", reading_buf);

      lv_event_send(ui_IlluminanceValue, LV_EVENT_REFRESH, &bh1750_reading);
    }

    if (xQueueReceive(xQueueUltrasonic, &ultrasonic_reading, 0) == pdTRUE) {
      ESP_LOGD(
          TAG,
          "[task_process_sensor_readings] Ultrasonic reading received: %lu",
          ultrasonic_reading);

      snprintf(reading_buf, sizeof(reading_buf), "%lu", ultrasonic_reading);
      mqtt_send_reading(mqtt_client, "distance", reading_buf);

      lv_event_send(ui_DistanceValue, LV_EVENT_REFRESH, &ultrasonic_reading);
    }
  }

  vTaskDelete(NULL);
}

esp_err_t setup_queues() {
  xQueueAM2302Humidity = xQueueCreate(1, sizeof(float));
  if (xQueueAM2302Humidity == 0) {
    ESP_LOGE(TAG, "[setup_queues] unable to setup xQueueAM2302Humidity");

    return ESP_ERR_NOT_FINISHED;
  }

  xQueueAM2302Temperature = xQueueCreate(1, sizeof(float));
  if (xQueueAM2302Temperature == 0) {
    ESP_LOGE(TAG, "[setup_queues] unable to setup xQueueAM2302Temperature");

    return ESP_ERR_NOT_FINISHED;
  }

  xQueueSoilMoisture = xQueueCreate(1, sizeof(uint32_t));
  if (xQueueSoilMoisture == 0) {
    ESP_LOGE(TAG, "[setup_queues] unable to setup xQueueSoilMoisture");

    return ESP_ERR_NOT_FINISHED;
  }

  xQueueMQ135 = xQueueCreate(1, sizeof(uint32_t));
  if (xQueueMQ135 == 0) {
    ESP_LOGE(TAG, "[setup_queues] unable to setup xQueueMQ135");

    return ESP_ERR_NOT_FINISHED;
  }

  xQueueBH1750 = xQueueCreate(1, sizeof(float));
  if (xQueueBH1750 == 0) {
    ESP_LOGE(TAG, "[setup_queues] unable to setup xQueueBH1750");

    return ESP_ERR_NOT_FINISHED;
  }

  xQueueUltrasonic = xQueueCreate(1, sizeof(uint32_t));
  if (xQueueUltrasonic == 0) {
    ESP_LOGE(TAG, "[setup_queues] unable to setup xQueueUltrasonic");

    return ESP_ERR_NOT_FINISHED;
  }

  return ESP_OK;
}

esp_err_t setup_tasks(adc_oneshot_unit_handle_t _adc1_handle) {
  BaseType_t res;

  esp_err_t ret = setup_queues();
  if (ret != ESP_OK) {
    return ret;
  }

  adc1_handle = _adc1_handle;

  res = xTaskCreate(&task_read_am2302, "read_am2302",
                    configMINIMAL_STACK_SIZE * 2, NULL, tskIDLE_PRIORITY + 1,
                    NULL);
  if (res == pdFALSE) {
    ESP_LOGE(TAG, "[setup_tasks] unable to setup task_read_am2302");

    return ESP_ERR_NOT_FINISHED;
  }

  res = xTaskCreate(&task_read_soil_moisture, "read_soil_moisture",
                    configMINIMAL_STACK_SIZE * 2, NULL, tskIDLE_PRIORITY + 1,
                    NULL);
  if (res == pdFALSE) {
    ESP_LOGE(TAG, "[setup_tasks] unable to setup task_read_soil_moisture");

    return ESP_ERR_NOT_FINISHED;
  }

  res =
      xTaskCreate(&task_read_mq135, "read_mq135", configMINIMAL_STACK_SIZE * 2,
                  NULL, tskIDLE_PRIORITY + 1, NULL);
  if (res == pdFALSE) {
    ESP_LOGE(TAG, "[setup_tasks] unable to setup task_read_mq135");

    return ESP_ERR_NOT_FINISHED;
  }

  res = xTaskCreate(&task_read_bh1750, "read_bh1750",
                    configMINIMAL_STACK_SIZE * 2, NULL, tskIDLE_PRIORITY + 1,
                    NULL);
  if (res == pdFALSE) {
    ESP_LOGE(TAG, "[setup_tasks] unable to setup task_read_bh1750");

    return ESP_ERR_NOT_FINISHED;
  }

  res = xTaskCreate(&task_read_ultrasonic, "task_read_ultrasonic",
                    configMINIMAL_STACK_SIZE * 2, NULL, tskIDLE_PRIORITY + 1,
                    NULL);
  if (res == pdFALSE) {
    ESP_LOGE(TAG, "[setup_tasks] unable to setup task_read_ultrasonic");

    return ESP_ERR_NOT_FINISHED;
  }

  res = xTaskCreate(&task_process_sensor_readings, "send_readings_to_mqtt",
                    configMINIMAL_STACK_SIZE * 2, NULL, tskIDLE_PRIORITY + 1,
                    NULL);
  if (res == pdFALSE) {
    ESP_LOGE(TAG, "[setup_tasks] unable to setup task_process_sensor_readings");

    return ESP_ERR_NOT_FINISHED;
  }

  return ESP_OK;
}
