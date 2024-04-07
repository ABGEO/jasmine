#include "buzzer.h"

esp_err_t buzzer_init() {
  ledc_timer_config_t ledc_timer = {.speed_mode = BUZZER_LEDC_MODE,
                                    .duty_resolution = BUZZER_LEDC_DUTY_RES,
                                    .timer_num = BUZZER_LEDC_TIMER,
                                    .freq_hz = CONFIG_BUZZER_DEFAULT_FREQUENCY,
                                    .clk_cfg = LEDC_AUTO_CLK};
  esp_err_t ret = ledc_timer_config(&ledc_timer);
  if (ret != ESP_OK) {
    return ret;
  }

  ledc_channel_config_t ledc_channel = {.speed_mode = BUZZER_LEDC_MODE,
                                        .channel = BUZZER_LEDC_CHANNEL,
                                        .timer_sel = BUZZER_LEDC_TIMER,
                                        .intr_type = LEDC_INTR_DISABLE,
                                        .gpio_num = CONFIG_BUZZER_GPIO,
                                        .duty = 0, // Set duty to 0%
                                        .hpoint = 0};

  return ledc_channel_config(&ledc_channel);
}

esp_err_t set_duty(int duty) {
  esp_err_t ret = ledc_set_duty(BUZZER_LEDC_MODE, BUZZER_LEDC_CHANNEL, duty);
  if (ret != ESP_OK) {
    return ret;
  }

  return ledc_update_duty(BUZZER_LEDC_MODE, BUZZER_LEDC_CHANNEL);
}

esp_err_t buzzer_tone(int freq_hz, int duty, int duration_ms) {
  esp_err_t ret = ledc_set_freq(BUZZER_LEDC_MODE, BUZZER_LEDC_TIMER, freq_hz);
  if (ret != ESP_OK) {
    return ret;
  }

  ret = set_duty(duty);
  if (ret != ESP_OK) {
    return ret;
  }

  vTaskDelay(duration_ms / portTICK_PERIOD_MS);

  return set_duty(0);
}
