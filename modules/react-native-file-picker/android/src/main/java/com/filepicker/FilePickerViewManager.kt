package com.filepicker

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.FilePickerViewManagerInterface
import com.facebook.react.viewmanagers.FilePickerViewManagerDelegate

@ReactModule(name = FilePickerViewManager.NAME)
class FilePickerViewManager : SimpleViewManager<FilePickerView>(),
  FilePickerViewManagerInterface<FilePickerView> {
  private val mDelegate: ViewManagerDelegate<FilePickerView>

  init {
    mDelegate = FilePickerViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<FilePickerView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): FilePickerView {
    return FilePickerView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: FilePickerView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "FilePickerView"
  }
}
