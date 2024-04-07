#include "esp_err.h"
#include <driver/i2c.h>

esp_err_t setup_i2c_bus() {
  i2c_config_t conf = {
      .mode = I2C_MODE_MASTER,
      .sda_io_num = CONFIG_COMMUTATION_I2C_MASTER_SDA_IO,
      .sda_pullup_en = GPIO_PULLUP_ENABLE,
      .scl_io_num = CONFIG_COMMUTATION_I2C_MASTER_SCL_IO,
      .scl_pullup_en = GPIO_PULLUP_ENABLE,
      .master.clk_speed = CONFIG_COMMUTATION_I2C_MASTER_CLK_SPEED,
      .clk_flags = I2C_SCLK_SRC_FLAG_FOR_NOMAL,
  };

  esp_err_t ret = i2c_param_config(I2C_NUM_0, &conf);
  if (ret != ESP_OK) {
    return ret;
  }

  return i2c_driver_install(I2C_NUM_0, conf.mode, 0, 0, 0);
}
