#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface FilePickerViewManager : RCTViewManager
@end

@implementation FilePickerViewManager

RCT_EXPORT_MODULE(FilePickerView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
