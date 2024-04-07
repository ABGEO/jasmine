#pragma once

#include "driver/ledc.h"
#include "esp_err.h"
#include "freertos/FreeRTOS.h"
#include <stdio.h>

#define BUZZER_LEDC_TIMER LEDC_TIMER_0
#define BUZZER_LEDC_MODE LEDC_LOW_SPEED_MODE
#define BUZZER_LEDC_CHANNEL LEDC_CHANNEL_0
#define BUZZER_LEDC_DUTY_RES LEDC_TIMER_13_BIT // Set duty resolution to 13 bits

esp_err_t buzzer_init();

esp_err_t buzzer_tone(int freq_hz, int duty, int duration_ms);
