// This file was generated by SquareLine Studio
// SquareLine Studio version: SquareLine Studio 1.4.0
// LVGL version: 8.3.11
// Project name: JasmineFloraNode

#include "ui.h"
#include "ui_helpers.h"

///////////////////// VARIABLES ////////////////////


// SCREEN: ui_WelcomeScreen
void ui_WelcomeScreen_screen_init(void);
lv_obj_t *ui_WelcomeScreen;
lv_obj_t *ui_Welcome;
lv_obj_t *ui_AppName;
lv_obj_t *ui_AppVersion;


// SCREEN: ui_MainScreen
void ui_MainScreen_screen_init(void);
lv_obj_t *ui_MainScreen;
lv_obj_t *ui_TopBarContainer;
lv_obj_t *ui_TopBarTitle;
lv_obj_t *ui_TopBarPager;
lv_obj_t *ui_BodyContainer;
lv_obj_t *ui_TemperatureBody;
lv_obj_t *ui_TemperatureValue;
lv_obj_t *ui_TemperatureUnit;
lv_obj_t *ui_TemperatureIcon;
lv_obj_t *ui_HumidityBody;
lv_obj_t *ui_HumidityValue;
lv_obj_t *ui_HumidityUnit;
lv_obj_t *ui_HumidityIcon;
lv_obj_t *ui_SoilMoistureBody;
lv_obj_t *ui_SoilMoistureValue;
lv_obj_t *ui_SoilMoistureUnit;
lv_obj_t *ui_SoilMoistureIcon;
lv_obj_t *ui_IlluminanceBody;
lv_obj_t *ui_IlluminanceValue;
lv_obj_t *ui_IlluminanceUnit;
lv_obj_t *ui_IlluminanceIcon;
lv_obj_t *ui_DistanceBody;
lv_obj_t *ui_DistanceValue;
lv_obj_t *ui_DistanceUnit;
lv_obj_t *ui_DistanceIcon;
lv_obj_t *ui_ConnectionBody;
lv_obj_t *ui_WifiStatusLabel;
lv_obj_t *ui_WifiStatusIcon;
lv_obj_t *ui_MQTTStatusLabel;
lv_obj_t *ui_MQTTStatusIcon;
lv_obj_t *ui____initial_actions0;
const lv_img_dsc_t *ui_imgset_humidity_indoor_fill0_wght400_grad0_opsz[1] = {&ui_img_humidity_indoor_fill0_wght400_grad0_opsz24_png};
const lv_img_dsc_t *ui_imgset_humidity_percentage_fill0_wght400_grad0_opsz[1] = {&ui_img_humidity_percentage_fill0_wght400_grad0_opsz24_png};
const lv_img_dsc_t *ui_imgset_lightbulb_fill0_wght400_grad0_opsz[1] = {&ui_img_lightbulb_fill0_wght400_grad0_opsz24_png};
const lv_img_dsc_t *ui_imgset_link_fill0_wght400_grad0_opsz[1] = {&ui_img_link_fill0_wght400_grad0_opsz24_png};
const lv_img_dsc_t *ui_imgset_link_off_fill0_wght400_grad0_opsz[1] = {&ui_img_link_off_fill0_wght400_grad0_opsz24_png};
const lv_img_dsc_t *ui_imgset_straighten_fill0_wght400_grad0_opsz[1] = {&ui_img_straighten_fill0_wght400_grad0_opsz24_png};
const lv_img_dsc_t *ui_imgset_thermometer_fill0_wght400_grad0_opsz[1] = {&ui_img_thermometer_fill0_wght400_grad0_opsz24_png};
const lv_img_dsc_t *ui_imgset_wifi_fill0_wght400_grad0_opsz[1] = {&ui_img_wifi_fill0_wght400_grad0_opsz24_png};
const lv_img_dsc_t *ui_imgset_wifi_off_fill0_wght400_grad0_opsz[1] = {&ui_img_wifi_off_fill0_wght400_grad0_opsz24_png};

///////////////////// TEST LVGL SETTINGS ////////////////////
#if LV_COLOR_DEPTH != 8
    #error "LV_COLOR_DEPTH should be 8bit to match SquareLine Studio's settings"
#endif
#if LV_COLOR_16_SWAP !=0
    #error "LV_COLOR_16_SWAP should be 0 to match SquareLine Studio's settings"
#endif

///////////////////// ANIMATIONS ////////////////////

///////////////////// FUNCTIONS ////////////////////

///////////////////// SCREENS ////////////////////

void ui_init( void )
{
lv_disp_t *dispp = lv_disp_get_default();
lv_theme_t *theme = lv_theme_default_init(dispp, lv_palette_main(LV_PALETTE_BLUE), lv_palette_main(LV_PALETTE_RED), false, LV_FONT_DEFAULT);
lv_disp_set_theme(dispp, theme);
ui_WelcomeScreen_screen_init();
ui_MainScreen_screen_init();
ui____initial_actions0 = lv_obj_create(NULL);
lv_disp_load_scr( ui_WelcomeScreen);
}
