FILE(GLOB_RECURSE app_sources ${CMAKE_SOURCE_DIR}/main/*.*)
file(GLOB_RECURSE app_ui_sources ${CMAKE_SOURCE_DIR}/main/ui/*.*)

idf_component_register(
        SRCS ${app_sources} ${app_ui_sources}
        INCLUDE_DIRS "."
)
