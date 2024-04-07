// This file was generated by SquareLine Studio
// SquareLine Studio version: SquareLine Studio 1.4.0
// LVGL version: 8.3.11
// Project name: JasmineFloraNode

#include "../ui.h"

void ui_MainScreen_screen_init(void)
{
ui_MainScreen = lv_obj_create(NULL);
lv_obj_clear_flag( ui_MainScreen, LV_OBJ_FLAG_SCROLLABLE );    /// Flags

ui_TopBarContainer = lv_obj_create(ui_MainScreen);
lv_obj_remove_style_all(ui_TopBarContainer);
lv_obj_set_width( ui_TopBarContainer, lv_pct(100));
lv_obj_set_height( ui_TopBarContainer, lv_pct(25));
lv_obj_set_align( ui_TopBarContainer, LV_ALIGN_TOP_MID );
lv_obj_clear_flag( ui_TopBarContainer, LV_OBJ_FLAG_CLICKABLE | LV_OBJ_FLAG_SCROLLABLE );    /// Flags
lv_obj_set_style_border_width(ui_TopBarContainer, 1, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_border_side(ui_TopBarContainer, LV_BORDER_SIDE_BOTTOM, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_TopBarTitle = lv_label_create(ui_TopBarContainer);
lv_obj_set_width( ui_TopBarTitle, lv_pct(80));
lv_obj_set_height( ui_TopBarTitle, LV_SIZE_CONTENT);   /// 1
lv_obj_set_x( ui_TopBarTitle, 0 );
lv_obj_set_y( ui_TopBarTitle, -3 );
lv_label_set_long_mode(ui_TopBarTitle,LV_LABEL_LONG_DOT);
lv_label_set_text(ui_TopBarTitle,"Temperature");
lv_obj_set_style_text_font(ui_TopBarTitle, &lv_font_montserrat_14, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_TopBarPager = lv_label_create(ui_TopBarContainer);
lv_obj_set_width( ui_TopBarPager, lv_pct(20));
lv_obj_set_height( ui_TopBarPager, LV_SIZE_CONTENT);   /// 1
lv_obj_set_x( ui_TopBarPager, 0 );
lv_obj_set_y( ui_TopBarPager, -3 );
lv_obj_set_align( ui_TopBarPager, LV_ALIGN_TOP_RIGHT );
lv_label_set_text(ui_TopBarPager,"1/6");
lv_obj_set_style_text_align(ui_TopBarPager, LV_TEXT_ALIGN_RIGHT, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_text_font(ui_TopBarPager, &lv_font_montserrat_14, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_BodyContainer = lv_obj_create(ui_MainScreen);
lv_obj_remove_style_all(ui_BodyContainer);
lv_obj_set_width( ui_BodyContainer, lv_pct(100));
lv_obj_set_height( ui_BodyContainer, lv_pct(75));
lv_obj_set_align( ui_BodyContainer, LV_ALIGN_BOTTOM_MID );
lv_obj_clear_flag( ui_BodyContainer, LV_OBJ_FLAG_CLICKABLE | LV_OBJ_FLAG_SCROLLABLE );    /// Flags

ui_TemperatureBody = lv_obj_create(ui_BodyContainer);
lv_obj_remove_style_all(ui_TemperatureBody);
lv_obj_set_width( ui_TemperatureBody, lv_pct(100));
lv_obj_set_height( ui_TemperatureBody, lv_pct(100));
lv_obj_set_align( ui_TemperatureBody, LV_ALIGN_CENTER );
lv_obj_set_flex_flow(ui_TemperatureBody,LV_FLEX_FLOW_ROW);
lv_obj_set_flex_align(ui_TemperatureBody, LV_FLEX_ALIGN_SPACE_BETWEEN, LV_FLEX_ALIGN_CENTER, LV_FLEX_ALIGN_CENTER);
lv_obj_clear_flag( ui_TemperatureBody, LV_OBJ_FLAG_CLICKABLE | LV_OBJ_FLAG_SCROLLABLE );    /// Flags
lv_obj_set_style_border_side(ui_TemperatureBody, LV_BORDER_SIDE_BOTTOM, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_TemperatureValue = lv_label_create(ui_TemperatureBody);
lv_obj_set_width( ui_TemperatureValue, LV_SIZE_CONTENT);  /// 1
lv_obj_set_height( ui_TemperatureValue, LV_SIZE_CONTENT);   /// 1
lv_obj_set_align( ui_TemperatureValue, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_TemperatureValue,"22.3");
lv_obj_set_style_text_font(ui_TemperatureValue, &lv_font_montserrat_22, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_left(ui_TemperatureValue, 5, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_right(ui_TemperatureValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_top(ui_TemperatureValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_bottom(ui_TemperatureValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_TemperatureUnit = lv_label_create(ui_TemperatureBody);
lv_obj_set_height( ui_TemperatureUnit, LV_SIZE_CONTENT);   /// 1
lv_obj_set_flex_grow( ui_TemperatureUnit, 1);
lv_obj_set_align( ui_TemperatureUnit, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_TemperatureUnit,"°C");
lv_obj_set_style_text_font(ui_TemperatureUnit, &lv_font_montserrat_22, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_left(ui_TemperatureUnit, 10, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_right(ui_TemperatureUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_top(ui_TemperatureUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_bottom(ui_TemperatureUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_TemperatureIcon = lv_img_create(ui_TemperatureBody);
lv_img_set_src(ui_TemperatureIcon, &ui_img_thermometer_fill0_wght400_grad0_opsz24_png);
lv_obj_set_width( ui_TemperatureIcon, LV_SIZE_CONTENT);  /// 24
lv_obj_set_height( ui_TemperatureIcon, LV_SIZE_CONTENT);   /// 24
lv_obj_set_align( ui_TemperatureIcon, LV_ALIGN_RIGHT_MID );
lv_obj_add_flag( ui_TemperatureIcon, LV_OBJ_FLAG_ADV_HITTEST );   /// Flags
lv_obj_clear_flag( ui_TemperatureIcon, LV_OBJ_FLAG_SCROLLABLE );    /// Flags

ui_HumidityBody = lv_obj_create(ui_BodyContainer);
lv_obj_remove_style_all(ui_HumidityBody);
lv_obj_set_width( ui_HumidityBody, lv_pct(100));
lv_obj_set_height( ui_HumidityBody, lv_pct(100));
lv_obj_set_align( ui_HumidityBody, LV_ALIGN_CENTER );
lv_obj_set_flex_flow(ui_HumidityBody,LV_FLEX_FLOW_ROW);
lv_obj_set_flex_align(ui_HumidityBody, LV_FLEX_ALIGN_SPACE_BETWEEN, LV_FLEX_ALIGN_CENTER, LV_FLEX_ALIGN_CENTER);
lv_obj_add_flag( ui_HumidityBody, LV_OBJ_FLAG_HIDDEN );   /// Flags
lv_obj_clear_flag( ui_HumidityBody, LV_OBJ_FLAG_CLICKABLE | LV_OBJ_FLAG_SCROLLABLE );    /// Flags
lv_obj_set_style_border_side(ui_HumidityBody, LV_BORDER_SIDE_BOTTOM, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_HumidityValue = lv_label_create(ui_HumidityBody);
lv_obj_set_width( ui_HumidityValue, LV_SIZE_CONTENT);  /// 1
lv_obj_set_height( ui_HumidityValue, LV_SIZE_CONTENT);   /// 1
lv_obj_set_align( ui_HumidityValue, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_HumidityValue,"85.4");
lv_obj_set_style_text_font(ui_HumidityValue, &lv_font_montserrat_22, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_left(ui_HumidityValue, 5, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_right(ui_HumidityValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_top(ui_HumidityValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_bottom(ui_HumidityValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_HumidityUnit = lv_label_create(ui_HumidityBody);
lv_obj_set_height( ui_HumidityUnit, LV_SIZE_CONTENT);   /// 1
lv_obj_set_flex_grow( ui_HumidityUnit, 1);
lv_obj_set_align( ui_HumidityUnit, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_HumidityUnit,"%");
lv_obj_set_style_text_font(ui_HumidityUnit, &lv_font_montserrat_22, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_left(ui_HumidityUnit, 10, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_right(ui_HumidityUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_top(ui_HumidityUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_bottom(ui_HumidityUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_HumidityIcon = lv_img_create(ui_HumidityBody);
lv_img_set_src(ui_HumidityIcon, &ui_img_humidity_indoor_fill0_wght400_grad0_opsz24_png);
lv_obj_set_width( ui_HumidityIcon, LV_SIZE_CONTENT);  /// 24
lv_obj_set_height( ui_HumidityIcon, LV_SIZE_CONTENT);   /// 24
lv_obj_set_align( ui_HumidityIcon, LV_ALIGN_RIGHT_MID );
lv_obj_add_flag( ui_HumidityIcon, LV_OBJ_FLAG_ADV_HITTEST );   /// Flags
lv_obj_clear_flag( ui_HumidityIcon, LV_OBJ_FLAG_SCROLLABLE );    /// Flags

ui_SoilMoistureBody = lv_obj_create(ui_BodyContainer);
lv_obj_remove_style_all(ui_SoilMoistureBody);
lv_obj_set_width( ui_SoilMoistureBody, lv_pct(100));
lv_obj_set_height( ui_SoilMoistureBody, lv_pct(100));
lv_obj_set_align( ui_SoilMoistureBody, LV_ALIGN_CENTER );
lv_obj_set_flex_flow(ui_SoilMoistureBody,LV_FLEX_FLOW_ROW);
lv_obj_set_flex_align(ui_SoilMoistureBody, LV_FLEX_ALIGN_SPACE_BETWEEN, LV_FLEX_ALIGN_CENTER, LV_FLEX_ALIGN_CENTER);
lv_obj_add_flag( ui_SoilMoistureBody, LV_OBJ_FLAG_HIDDEN );   /// Flags
lv_obj_clear_flag( ui_SoilMoistureBody, LV_OBJ_FLAG_CLICKABLE | LV_OBJ_FLAG_SCROLLABLE );    /// Flags
lv_obj_set_style_border_side(ui_SoilMoistureBody, LV_BORDER_SIDE_BOTTOM, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_SoilMoistureValue = lv_label_create(ui_SoilMoistureBody);
lv_obj_set_width( ui_SoilMoistureValue, LV_SIZE_CONTENT);  /// 1
lv_obj_set_height( ui_SoilMoistureValue, LV_SIZE_CONTENT);   /// 1
lv_obj_set_align( ui_SoilMoistureValue, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_SoilMoistureValue,"62.3");
lv_obj_set_style_text_font(ui_SoilMoistureValue, &lv_font_montserrat_22, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_left(ui_SoilMoistureValue, 5, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_right(ui_SoilMoistureValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_top(ui_SoilMoistureValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_bottom(ui_SoilMoistureValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_SoilMoistureUnit = lv_label_create(ui_SoilMoistureBody);
lv_obj_set_height( ui_SoilMoistureUnit, LV_SIZE_CONTENT);   /// 1
lv_obj_set_flex_grow( ui_SoilMoistureUnit, 1);
lv_obj_set_align( ui_SoilMoistureUnit, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_SoilMoistureUnit,"%");
lv_obj_set_style_text_font(ui_SoilMoistureUnit, &lv_font_montserrat_22, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_left(ui_SoilMoistureUnit, 10, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_right(ui_SoilMoistureUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_top(ui_SoilMoistureUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_bottom(ui_SoilMoistureUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_SoilMoistureIcon = lv_img_create(ui_SoilMoistureBody);
lv_img_set_src(ui_SoilMoistureIcon, &ui_img_humidity_percentage_fill0_wght400_grad0_opsz24_png);
lv_obj_set_width( ui_SoilMoistureIcon, LV_SIZE_CONTENT);  /// 24
lv_obj_set_height( ui_SoilMoistureIcon, LV_SIZE_CONTENT);   /// 24
lv_obj_set_align( ui_SoilMoistureIcon, LV_ALIGN_RIGHT_MID );
lv_obj_add_flag( ui_SoilMoistureIcon, LV_OBJ_FLAG_ADV_HITTEST );   /// Flags
lv_obj_clear_flag( ui_SoilMoistureIcon, LV_OBJ_FLAG_SCROLLABLE );    /// Flags

ui_IlluminanceBody = lv_obj_create(ui_BodyContainer);
lv_obj_remove_style_all(ui_IlluminanceBody);
lv_obj_set_width( ui_IlluminanceBody, lv_pct(100));
lv_obj_set_height( ui_IlluminanceBody, lv_pct(100));
lv_obj_set_align( ui_IlluminanceBody, LV_ALIGN_CENTER );
lv_obj_set_flex_flow(ui_IlluminanceBody,LV_FLEX_FLOW_ROW);
lv_obj_set_flex_align(ui_IlluminanceBody, LV_FLEX_ALIGN_SPACE_BETWEEN, LV_FLEX_ALIGN_CENTER, LV_FLEX_ALIGN_CENTER);
lv_obj_add_flag( ui_IlluminanceBody, LV_OBJ_FLAG_HIDDEN );   /// Flags
lv_obj_clear_flag( ui_IlluminanceBody, LV_OBJ_FLAG_CLICKABLE | LV_OBJ_FLAG_SCROLLABLE );    /// Flags
lv_obj_set_style_border_side(ui_IlluminanceBody, LV_BORDER_SIDE_BOTTOM, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_IlluminanceValue = lv_label_create(ui_IlluminanceBody);
lv_obj_set_width( ui_IlluminanceValue, LV_SIZE_CONTENT);  /// 1
lv_obj_set_height( ui_IlluminanceValue, LV_SIZE_CONTENT);   /// 1
lv_obj_set_align( ui_IlluminanceValue, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_IlluminanceValue,"123.4");
lv_obj_set_style_text_font(ui_IlluminanceValue, &lv_font_montserrat_22, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_left(ui_IlluminanceValue, 5, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_right(ui_IlluminanceValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_top(ui_IlluminanceValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_bottom(ui_IlluminanceValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_IlluminanceUnit = lv_label_create(ui_IlluminanceBody);
lv_obj_set_height( ui_IlluminanceUnit, LV_SIZE_CONTENT);   /// 1
lv_obj_set_flex_grow( ui_IlluminanceUnit, 1);
lv_obj_set_align( ui_IlluminanceUnit, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_IlluminanceUnit,"lx");
lv_obj_set_style_text_font(ui_IlluminanceUnit, &lv_font_montserrat_22, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_left(ui_IlluminanceUnit, 10, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_right(ui_IlluminanceUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_top(ui_IlluminanceUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_bottom(ui_IlluminanceUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_IlluminanceIcon = lv_img_create(ui_IlluminanceBody);
lv_img_set_src(ui_IlluminanceIcon, &ui_img_lightbulb_fill0_wght400_grad0_opsz24_png);
lv_obj_set_width( ui_IlluminanceIcon, LV_SIZE_CONTENT);  /// 24
lv_obj_set_height( ui_IlluminanceIcon, LV_SIZE_CONTENT);   /// 24
lv_obj_set_align( ui_IlluminanceIcon, LV_ALIGN_RIGHT_MID );
lv_obj_add_flag( ui_IlluminanceIcon, LV_OBJ_FLAG_ADV_HITTEST );   /// Flags
lv_obj_clear_flag( ui_IlluminanceIcon, LV_OBJ_FLAG_SCROLLABLE );    /// Flags

ui_DistanceBody = lv_obj_create(ui_BodyContainer);
lv_obj_remove_style_all(ui_DistanceBody);
lv_obj_set_width( ui_DistanceBody, lv_pct(100));
lv_obj_set_height( ui_DistanceBody, lv_pct(100));
lv_obj_set_align( ui_DistanceBody, LV_ALIGN_CENTER );
lv_obj_set_flex_flow(ui_DistanceBody,LV_FLEX_FLOW_ROW);
lv_obj_set_flex_align(ui_DistanceBody, LV_FLEX_ALIGN_SPACE_BETWEEN, LV_FLEX_ALIGN_CENTER, LV_FLEX_ALIGN_CENTER);
lv_obj_add_flag( ui_DistanceBody, LV_OBJ_FLAG_HIDDEN );   /// Flags
lv_obj_clear_flag( ui_DistanceBody, LV_OBJ_FLAG_CLICKABLE | LV_OBJ_FLAG_SCROLLABLE );    /// Flags
lv_obj_set_style_border_side(ui_DistanceBody, LV_BORDER_SIDE_BOTTOM, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_DistanceValue = lv_label_create(ui_DistanceBody);
lv_obj_set_width( ui_DistanceValue, LV_SIZE_CONTENT);  /// 1
lv_obj_set_height( ui_DistanceValue, LV_SIZE_CONTENT);   /// 1
lv_obj_set_align( ui_DistanceValue, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_DistanceValue,"16");
lv_obj_set_style_text_font(ui_DistanceValue, &lv_font_montserrat_22, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_left(ui_DistanceValue, 5, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_right(ui_DistanceValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_top(ui_DistanceValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_bottom(ui_DistanceValue, 0, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_DistanceUnit = lv_label_create(ui_DistanceBody);
lv_obj_set_height( ui_DistanceUnit, LV_SIZE_CONTENT);   /// 1
lv_obj_set_flex_grow( ui_DistanceUnit, 1);
lv_obj_set_align( ui_DistanceUnit, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_DistanceUnit,"CM");
lv_obj_set_style_text_font(ui_DistanceUnit, &lv_font_montserrat_22, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_left(ui_DistanceUnit, 10, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_right(ui_DistanceUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_top(ui_DistanceUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);
lv_obj_set_style_pad_bottom(ui_DistanceUnit, 0, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_DistanceIcon = lv_img_create(ui_DistanceBody);
lv_img_set_src(ui_DistanceIcon, &ui_img_straighten_fill0_wght400_grad0_opsz24_png);
lv_obj_set_width( ui_DistanceIcon, LV_SIZE_CONTENT);  /// 24
lv_obj_set_height( ui_DistanceIcon, LV_SIZE_CONTENT);   /// 24
lv_obj_set_align( ui_DistanceIcon, LV_ALIGN_RIGHT_MID );
lv_obj_add_flag( ui_DistanceIcon, LV_OBJ_FLAG_ADV_HITTEST );   /// Flags
lv_obj_clear_flag( ui_DistanceIcon, LV_OBJ_FLAG_SCROLLABLE );    /// Flags

ui_ConnectionBody = lv_obj_create(ui_BodyContainer);
lv_obj_remove_style_all(ui_ConnectionBody);
lv_obj_set_width( ui_ConnectionBody, lv_pct(100));
lv_obj_set_height( ui_ConnectionBody, lv_pct(100));
lv_obj_set_align( ui_ConnectionBody, LV_ALIGN_CENTER );
lv_obj_add_flag( ui_ConnectionBody, LV_OBJ_FLAG_HIDDEN );   /// Flags
lv_obj_clear_flag( ui_ConnectionBody, LV_OBJ_FLAG_CLICKABLE | LV_OBJ_FLAG_SCROLLABLE );    /// Flags
lv_obj_set_style_border_side(ui_ConnectionBody, LV_BORDER_SIDE_BOTTOM, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_WifiStatusLabel = lv_label_create(ui_ConnectionBody);
lv_obj_set_width( ui_WifiStatusLabel, LV_SIZE_CONTENT);  /// 1
lv_obj_set_height( ui_WifiStatusLabel, LV_SIZE_CONTENT);   /// 1
lv_obj_set_x( ui_WifiStatusLabel, 0 );
lv_obj_set_y( ui_WifiStatusLabel, 5 );
lv_label_set_text(ui_WifiStatusLabel,"Wifi:");

ui_WifiStatusIcon = lv_img_create(ui_ConnectionBody);
lv_img_set_src(ui_WifiStatusIcon, &ui_img_wifi_off_fill0_wght400_grad0_opsz24_png);
lv_obj_set_width( ui_WifiStatusIcon, LV_SIZE_CONTENT);  /// 24
lv_obj_set_height( ui_WifiStatusIcon, LV_SIZE_CONTENT);   /// 24
lv_obj_set_align( ui_WifiStatusIcon, LV_ALIGN_TOP_MID );
lv_obj_add_flag( ui_WifiStatusIcon, LV_OBJ_FLAG_ADV_HITTEST );   /// Flags
lv_obj_clear_flag( ui_WifiStatusIcon, LV_OBJ_FLAG_SCROLLABLE );    /// Flags

ui_MQTTStatusLabel = lv_label_create(ui_ConnectionBody);
lv_obj_set_width( ui_MQTTStatusLabel, LV_SIZE_CONTENT);  /// 1
lv_obj_set_height( ui_MQTTStatusLabel, LV_SIZE_CONTENT);   /// 1
lv_obj_set_x( ui_MQTTStatusLabel, 0 );
lv_obj_set_y( ui_MQTTStatusLabel, 10 );
lv_obj_set_align( ui_MQTTStatusLabel, LV_ALIGN_LEFT_MID );
lv_label_set_text(ui_MQTTStatusLabel,"MQTT:");

ui_MQTTStatusIcon = lv_img_create(ui_ConnectionBody);
lv_img_set_src(ui_MQTTStatusIcon, &ui_img_link_off_fill0_wght400_grad0_opsz24_png);
lv_obj_set_width( ui_MQTTStatusIcon, LV_SIZE_CONTENT);  /// 24
lv_obj_set_height( ui_MQTTStatusIcon, LV_SIZE_CONTENT);   /// 24
lv_obj_set_x( ui_MQTTStatusIcon, 0 );
lv_obj_set_y( ui_MQTTStatusIcon, 10 );
lv_obj_set_align( ui_MQTTStatusIcon, LV_ALIGN_CENTER );
lv_obj_add_flag( ui_MQTTStatusIcon, LV_OBJ_FLAG_ADV_HITTEST );   /// Flags
lv_obj_clear_flag( ui_MQTTStatusIcon, LV_OBJ_FLAG_SCROLLABLE );    /// Flags

}