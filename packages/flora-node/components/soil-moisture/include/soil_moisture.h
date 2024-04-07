#pragma once

#include <esp_adc/adc_oneshot.h>
#include <hal/adc_types.h>

#define NO_OF_SAMPLES 64

esp_err_t soil_moisture_setup(adc_oneshot_unit_handle_t _adc1_handle,
                              adc_channel_t _channel);
uint32_t soil_moisture_read();
float soil_moisture_normalization(uint32_t min_value, uint32_t max_value,
                                  uint32_t value_t);
