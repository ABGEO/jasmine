// This file was generated by SquareLine Studio
// SquareLine Studio version: SquareLine Studio 1.4.0
// LVGL version: 8.3.11
// Project name: JasmineFloraNode

#include "../ui.h"

void ui_WelcomeScreen_screen_init(void)
{
ui_WelcomeScreen = lv_obj_create(NULL);
lv_obj_clear_flag( ui_WelcomeScreen, LV_OBJ_FLAG_SCROLLABLE );    /// Flags

ui_Welcome = lv_label_create(ui_WelcomeScreen);
lv_obj_set_width( ui_Welcome, LV_SIZE_CONTENT);  /// 1
lv_obj_set_height( ui_Welcome, LV_SIZE_CONTENT);   /// 1
lv_obj_set_align( ui_Welcome, LV_ALIGN_TOP_MID );
lv_label_set_text(ui_Welcome,"Welcome to");
lv_obj_set_style_text_font(ui_Welcome, &lv_font_montserrat_12, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_AppName = lv_label_create(ui_WelcomeScreen);
lv_obj_set_width( ui_AppName, LV_SIZE_CONTENT);  /// 1
lv_obj_set_height( ui_AppName, LV_SIZE_CONTENT);   /// 1
lv_obj_set_align( ui_AppName, LV_ALIGN_CENTER );
lv_label_set_text(ui_AppName,"Flora Bridge");
lv_obj_set_style_text_font(ui_AppName, &lv_font_montserrat_18, LV_PART_MAIN| LV_STATE_DEFAULT);

ui_AppVersion = lv_label_create(ui_WelcomeScreen);
lv_obj_set_width( ui_AppVersion, LV_SIZE_CONTENT);  /// 1
lv_obj_set_height( ui_AppVersion, LV_SIZE_CONTENT);   /// 1
lv_obj_set_align( ui_AppVersion, LV_ALIGN_BOTTOM_MID );
lv_label_set_text(ui_AppVersion,"v1.0.0");
lv_obj_set_style_text_font(ui_AppVersion, &lv_font_montserrat_12, LV_PART_MAIN| LV_STATE_DEFAULT);

}
