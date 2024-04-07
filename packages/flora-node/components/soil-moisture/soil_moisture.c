#include "soil_moisture.h"

static adc_oneshot_unit_handle_t adc1_handle;
static adc_channel_t channel;

static const adc_bitwidth_t bitwidth = ADC_BITWIDTH_DEFAULT;
static const adc_atten_t attenuation = ADC_ATTEN_DB_12;

esp_err_t soil_moisture_setup(adc_oneshot_unit_handle_t _adc1_handle,
                              adc_channel_t _channel) {
  adc1_handle = _adc1_handle;
  channel = _channel;

  adc_oneshot_chan_cfg_t config = {
      .bitwidth = bitwidth,
      .atten = attenuation,
  };

  return adc_oneshot_config_channel(adc1_handle, channel, &config);
}

uint32_t soil_moisture_read() {
  int adc_raw;
  int dividers = 0;
  uint32_t adc_reading = 0;

  for (int i = 0; i < NO_OF_SAMPLES; i++) {
    if (adc_oneshot_read(adc1_handle, channel, &adc_raw) == ESP_OK) {
      adc_reading += adc_raw;
      dividers++;
    }
  }

  if (dividers != 0) {
    return adc_reading / dividers;
  }

  return adc_reading;
}

float soil_moisture_normalization(uint32_t min_value, uint32_t max_value,
                                  uint32_t value_t) {
  return 100 -
         ((float)(value_t - min_value) / (float)(max_value - min_value)) * 100;
}
