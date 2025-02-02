#pragma once

#include "pch.h"
#include "resource.h"

#if __has_include("codegen/NativeReactNativeFileDataTypes.g.h")
  #include "codegen/NativeReactNativeFileDataTypes.g.h"
#endif
#include "codegen/NativeReactNativeFileSpec.g.h"

#include "NativeModules.h"

namespace winrt::ReactNativeFile
{

REACT_MODULE(ReactNativeFile)
struct ReactNativeFile
{
  using ModuleSpec = ReactNativeFileCodegen::ReactNativeFileSpec;

  REACT_INIT(Initialize)
  void Initialize(React::ReactContext const &reactContext) noexcept;

  REACT_SYNC_METHOD(multiply)
  double multiply(double a, double b) noexcept;

private:
  React::ReactContext m_context;
};

} // namespace winrt::ReactNativeFile