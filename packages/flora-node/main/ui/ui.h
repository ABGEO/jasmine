// This file was generated by SquareLine Studio
// SquareLine Studio version: SquareLine Studio 1.4.0
// LVGL version: 8.3.11
// Project name: JasmineFloraNode

#ifndef _JASMINEFLORANODE_UI_H
#define _JASMINEFLORANODE_UI_H

#ifdef __cplusplus
extern "C" {
#endif

#if defined __has_include
  #if __has_include("lvgl.h")
    #include "lvgl.h"
  #elif __has_include("lvgl/lvgl.h")
    #include "lvgl/lvgl.h"
  #else
    #include "lvgl.h"
  #endif
#else
  #include "lvgl.h"
#endif

#include "ui_helpers.h"
#include "ui_events.h"

// SCREEN: ui_WelcomeScreen
void ui_WelcomeScreen_screen_init(void);
extern lv_obj_t *ui_WelcomeScreen;
extern lv_obj_t *ui_Welcome;
extern lv_obj_t *ui_AppName;
extern lv_obj_t *ui_AppVersion;
// SCREEN: ui_MainScreen
void ui_MainScreen_screen_init(void);
extern lv_obj_t *ui_MainScreen;
extern lv_obj_t *ui_TopBarContainer;
extern lv_obj_t *ui_TopBarTitle;
extern lv_obj_t *ui_TopBarPager;
extern lv_obj_t *ui_BodyContainer;
extern lv_obj_t *ui_TemperatureBody;
extern lv_obj_t *ui_TemperatureValue;
extern lv_obj_t *ui_TemperatureUnit;
extern lv_obj_t *ui_TemperatureIcon;
extern lv_obj_t *ui_HumidityBody;
extern lv_obj_t *ui_HumidityValue;
extern lv_obj_t *ui_HumidityUnit;
extern lv_obj_t *ui_HumidityIcon;
extern lv_obj_t *ui_SoilMoistureBody;
extern lv_obj_t *ui_SoilMoistureValue;
extern lv_obj_t *ui_SoilMoistureUnit;
extern lv_obj_t *ui_SoilMoistureIcon;
extern lv_obj_t *ui_IlluminanceBody;
extern lv_obj_t *ui_IlluminanceValue;
extern lv_obj_t *ui_IlluminanceUnit;
extern lv_obj_t *ui_IlluminanceIcon;
extern lv_obj_t *ui_DistanceBody;
extern lv_obj_t *ui_DistanceValue;
extern lv_obj_t *ui_DistanceUnit;
extern lv_obj_t *ui_DistanceIcon;
extern lv_obj_t *ui_ConnectionBody;
extern lv_obj_t *ui_WifiStatusLabel;
extern lv_obj_t *ui_WifiStatusIcon;
extern lv_obj_t *ui_MQTTStatusLabel;
extern lv_obj_t *ui_MQTTStatusIcon;
extern lv_obj_t *ui____initial_actions0;

LV_IMG_DECLARE( ui_img_thermometer_fill0_wght400_grad0_opsz24_png);   // assets/thermometer_FILL0_wght400_GRAD0_opsz24.png
LV_IMG_DECLARE( ui_img_humidity_indoor_fill0_wght400_grad0_opsz24_png);   // assets/humidity_indoor_FILL0_wght400_GRAD0_opsz24.png
LV_IMG_DECLARE( ui_img_humidity_percentage_fill0_wght400_grad0_opsz24_png);   // assets/humidity_percentage_FILL0_wght400_GRAD0_opsz24.png
LV_IMG_DECLARE( ui_img_lightbulb_fill0_wght400_grad0_opsz24_png);   // assets/lightbulb_FILL0_wght400_GRAD0_opsz24.png
LV_IMG_DECLARE( ui_img_straighten_fill0_wght400_grad0_opsz24_png);   // assets/straighten_FILL0_wght400_GRAD0_opsz24.png
LV_IMG_DECLARE( ui_img_wifi_off_fill0_wght400_grad0_opsz24_png);   // assets/wifi_off_FILL0_wght400_GRAD0_opsz24.png
LV_IMG_DECLARE( ui_img_link_off_fill0_wght400_grad0_opsz24_png);   // assets/link_off_FILL0_wght400_GRAD0_opsz24.png
LV_IMG_DECLARE( ui_img_link_fill0_wght400_grad0_opsz24_png);   // assets/link_FILL0_wght400_GRAD0_opsz24.png
LV_IMG_DECLARE( ui_img_wifi_fill0_wght400_grad0_opsz24_png);   // assets/wifi_FILL0_wght400_GRAD0_opsz24.png




void ui_init(void);

#ifdef __cplusplus
} /*extern "C"*/
#endif

#endif
