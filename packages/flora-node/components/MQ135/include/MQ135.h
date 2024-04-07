#pragma once

#include <esp_adc/adc_oneshot.h>

#define NO_OF_SAMPLES 64

esp_err_t MQ135_setup(adc_oneshot_unit_handle_t _adc1_handle,
                      adc_channel_t _channel);
uint32_t MQ135_read();
