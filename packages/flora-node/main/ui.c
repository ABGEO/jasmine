#include "ui/ui.h"
#include "esp_err.h"
#include "esp_lcd_panel_io.h"
#include "esp_lcd_panel_ops.h"
#include "esp_lcd_panel_ssd1306.h"
#include "esp_lvgl_port.h"

static void ui_update_temperature_cb(lv_event_t *e) {
  float *value = lv_event_get_param(e);
  lv_label_set_text_fmt(ui_TemperatureValue, "%.1f", *value);
}

static void ui_update_humidity_cb(lv_event_t *e) {
  float *value = lv_event_get_param(e);
  lv_label_set_text_fmt(ui_HumidityValue, "%.1f", *value);
}

static void ui_update_soil_moisture_cb(lv_event_t *e) {
  float *value = lv_event_get_param(e);
  lv_label_set_text_fmt(ui_SoilMoistureValue, "%.1f", *value);
}

static void ui_update_illuminance_cb(lv_event_t *e) {
  float *value = lv_event_get_param(e);
  lv_label_set_text_fmt(ui_IlluminanceValue, "%.1f", *value);
}

static void ui_update_distance_cb(lv_event_t *e) {
  uint32_t *value = lv_event_get_param(e);
  lv_label_set_text_fmt(ui_DistanceValue, "%lu", *value);
}

static void ui_update_wifi_status_cb(lv_event_t *e) {
  if ((bool)lv_event_get_param(e)) {
    lv_img_set_src(ui_WifiStatusIcon,
                   &ui_img_wifi_fill0_wght400_grad0_opsz24_png);
  } else {
    lv_img_set_src(ui_WifiStatusIcon,
                   &ui_img_wifi_off_fill0_wght400_grad0_opsz24_png);
  }
}

static void ui_update_mqtt_status_cb(lv_event_t *e) {
  if ((bool)lv_event_get_param(e)) {
    lv_img_set_src(ui_MQTTStatusIcon,
                   &ui_img_link_fill0_wght400_grad0_opsz24_png);
  } else {
    lv_img_set_src(ui_MQTTStatusIcon,
                   &ui_img_link_off_fill0_wght400_grad0_opsz24_png);
  }
}

esp_err_t setup_display() {
  // @todo: this setup uses legacy i2c driver. Move to new driver when bh1750
  // fixed (it also uses legacy driver).

  esp_err_t ret;
  esp_lcd_panel_io_handle_t io_handle = NULL;
  esp_lcd_panel_handle_t panel_handle = NULL;

  esp_lcd_panel_io_i2c_config_t io_config = {
      .dev_addr = CONFIG_PERIPHERAL_SSD1306_I2C_ADDR,
      .control_phase_bytes = 1, // According to SSD1306 datasheet
      .lcd_cmd_bits = 8,        // According to SSD1306 datasheet
      .lcd_param_bits = 8,      // According to SSD1306 datasheet
      .dc_bit_offset = 6,       // According to SSD1306 datasheet
  };
  ret = esp_lcd_new_panel_io_i2c(I2C_NUM_0, &io_config, &io_handle);
  if (ret != ESP_OK) {
    return ret;
  }

  esp_lcd_panel_ssd1306_config_t ssd1306_config = {
      .height = CONFIG_PERIPHERAL_SSD1306_V_RES,
  };
  esp_lcd_panel_dev_config_t panel_config = {
      .vendor_config = &ssd1306_config,
      .bits_per_pixel = 1,
      .reset_gpio_num = -1,
  };

  ret = esp_lcd_new_panel_ssd1306(io_handle, &panel_config, &panel_handle);
  if (ret != ESP_OK) {
    return ret;
  }

  ret = esp_lcd_panel_reset(panel_handle);
  if (ret != ESP_OK) {
    return ret;
  }

  ret = esp_lcd_panel_init(panel_handle);
  if (ret != ESP_OK) {
    return ret;
  }

  ret = esp_lcd_panel_disp_on_off(panel_handle, true);
  if (ret != ESP_OK) {
    return ret;
  }

  const lvgl_port_cfg_t lvgl_cfg = ESP_LVGL_PORT_INIT_CONFIG();
  lvgl_port_init(&lvgl_cfg);

  const lvgl_port_display_cfg_t disp_cfg = {
      .io_handle = io_handle,
      .panel_handle = panel_handle,
      .buffer_size =
          CONFIG_PERIPHERAL_SSD1306_H_RES * CONFIG_PERIPHERAL_SSD1306_V_RES,
      .double_buffer = true,
      .hres = CONFIG_PERIPHERAL_SSD1306_H_RES,
      .vres = CONFIG_PERIPHERAL_SSD1306_V_RES,
      .monochrome = true,
      .rotation = {
          .swap_xy = false,
          .mirror_x = false,
          .mirror_y = false,
      }};
  lvgl_port_add_disp(&disp_cfg);

  return ESP_OK;
}

void setup_event_callbacks() {
  lv_obj_add_event_cb(ui_TemperatureValue, ui_update_temperature_cb,
                      LV_EVENT_REFRESH, NULL);
  lv_obj_add_event_cb(ui_HumidityValue, ui_update_humidity_cb, LV_EVENT_REFRESH,
                      NULL);
  lv_obj_add_event_cb(ui_SoilMoistureValue, ui_update_soil_moisture_cb,
                      LV_EVENT_REFRESH, NULL);
  lv_obj_add_event_cb(ui_IlluminanceValue, ui_update_illuminance_cb,
                      LV_EVENT_REFRESH, NULL);
  lv_obj_add_event_cb(ui_DistanceValue, ui_update_distance_cb, LV_EVENT_REFRESH,
                      NULL);

  lv_obj_add_event_cb(ui_WifiStatusIcon, ui_update_wifi_status_cb,
                      LV_EVENT_REFRESH, NULL);
  lv_obj_add_event_cb(ui_MQTTStatusIcon, ui_update_mqtt_status_cb,
                      LV_EVENT_REFRESH, NULL);
}

esp_err_t setup_ui() {
  esp_err_t ret = setup_display();
  if (ret != ESP_OK) {
    return ret;
  }

  ui_init();

  setup_event_callbacks();

  return ESP_OK;
}
