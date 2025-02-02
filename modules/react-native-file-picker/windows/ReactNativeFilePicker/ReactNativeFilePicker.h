#pragma once

#include "pch.h"
#include "resource.h"

#if __has_include("codegen/NativeReactNativeFilePickerDataTypes.g.h")
  #include "codegen/NativeReactNativeFilePickerDataTypes.g.h"
#endif
#include "codegen/NativeReactNativeFilePickerSpec.g.h"

#include "NativeModules.h"

namespace winrt::ReactNativeFilePicker
{

REACT_MODULE(ReactNativeFilePicker)
struct ReactNativeFilePicker
{
  using ModuleSpec = ReactNativeFilePickerCodegen::ReactNativeFilePickerSpec;

  REACT_INIT(Initialize)
  void Initialize(React::ReactContext const &reactContext) noexcept;

  REACT_SYNC_METHOD(multiply)
  double multiply(double a, double b) noexcept;

private:
  React::ReactContext m_context;
};

} // namespace winrt::ReactNativeFilePicker