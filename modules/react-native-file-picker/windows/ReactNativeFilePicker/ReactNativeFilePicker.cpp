#include "pch.h"

#include "ReactNativeFilePicker.h"

namespace winrt::ReactNativeFilePicker
{

// See https://microsoft.github.io/react-native-windows/docs/native-modules for details on writing native modules

void ReactNativeFilePicker::Initialize(React::ReactContext const &reactContext) noexcept {
  m_context = reactContext;
}

double ReactNativeFilePicker::multiply(double a, double b) noexcept {
  return a * b;
}

} // namespace winrt::ReactNativeFilePicker