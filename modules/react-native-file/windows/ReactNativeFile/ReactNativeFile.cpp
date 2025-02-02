#include "pch.h"

#include "ReactNativeFile.h"

namespace winrt::ReactNativeFile
{

// See https://microsoft.github.io/react-native-windows/docs/native-modules for details on writing native modules

void ReactNativeFile::Initialize(React::ReactContext const &reactContext) noexcept {
  m_context = reactContext;
}

double ReactNativeFile::multiply(double a, double b) noexcept {
  return a * b;
}

} // namespace winrt::ReactNativeFile