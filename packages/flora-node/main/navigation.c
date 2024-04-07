#include "buzzer.h"
#include "esp_log.h"
#include "iot_button.h"
#include "ui/ui.h"

static const char *TAG = "flora_node:navigation";

static int navigation_index = 0;

typedef struct nav_element_t {
  char *title;
  lv_obj_t *container;
} nav_element_t;

typedef enum {
  NAVIGATION_HOME = 0,
  NAVIGATION_FORWARD,
  NAVIGATION_BACK,
} navigation_direction_t;

static void handle_navigation(navigation_direction_t direction) {
  nav_element_t navigation_table[] = {
      {.title = "Temperature", .container = ui_TemperatureBody},
      {.title = "Humidity", .container = ui_HumidityBody},
      {.title = "Soil Moisture", .container = ui_SoilMoistureBody},
      {.title = "Illuminance", .container = ui_IlluminanceBody},
      {.title = "Distance", .container = ui_DistanceBody},
      {.title = "Connection", .container = ui_ConnectionBody},
  };
  int navigation_length = sizeof(navigation_table) / sizeof(nav_element_t);
  int prev_index = navigation_index;

  if (direction == NAVIGATION_HOME) {
    navigation_index = 0;
  } else if (direction == NAVIGATION_FORWARD) {
    ++navigation_index;
  } else {
    --navigation_index;
  }

  if (navigation_index == -1) {
    navigation_index = navigation_length - 1;
  } else if (navigation_index == navigation_length) {
    navigation_index = 0;
  }

  lv_label_set_text(ui_TopBarTitle, navigation_table[navigation_index].title);
  lv_label_set_text_fmt(ui_TopBarPager, "%d/%d", navigation_index + 1,
                        navigation_length);

  lv_obj_add_flag(navigation_table[prev_index].container, LV_OBJ_FLAG_HIDDEN);
  lv_obj_clear_flag(navigation_table[navigation_index].container,
                    LV_OBJ_FLAG_HIDDEN);
}

static void button_event_cb(void *arg, void *data) {
  buzzer_tone(CONFIG_BUZZER_DEFAULT_FREQUENCY, CONFIG_BUZZER_DEFAULT_DUTY, 100);

  switch ((button_event_t)data) {
  case BUTTON_SINGLE_CLICK:
    handle_navigation(NAVIGATION_FORWARD);
    break;

  case BUTTON_DOUBLE_CLICK:
    handle_navigation(NAVIGATION_BACK);
    break;

  case BUTTON_LONG_PRESS_START:
    handle_navigation(NAVIGATION_HOME);
    break;

  default:
    ESP_LOGD(TAG, "Button event %u", (button_event_t)data);
    break;
  }
}

esp_err_t setup_navigation() {
  button_config_t btn_cfg = {
      .type = BUTTON_TYPE_GPIO,
      .long_press_time = CONFIG_NAVIGATION_BTN_LONG_PRESS_TIME,
      .short_press_time = CONFIG_NAVIGATION_BTN_SHORT_PRESS_TIME,
      .gpio_button_config =
          {
              .gpio_num = CONFIG_NAVIGATION_BTN_GPIO,
              .active_level = 1,
          },
  };
  button_handle_t btn = iot_button_create(&btn_cfg);

  esp_err_t err = iot_button_register_cb(
      btn, BUTTON_SINGLE_CLICK, button_event_cb, (void *)BUTTON_SINGLE_CLICK);
  err |= iot_button_register_cb(btn, BUTTON_DOUBLE_CLICK, button_event_cb,
                                (void *)BUTTON_DOUBLE_CLICK);
  err |= iot_button_register_cb(btn, BUTTON_LONG_PRESS_START, button_event_cb,
                                (void *)BUTTON_LONG_PRESS_START);

  return err;
}
