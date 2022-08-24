#import "PokemonsToast.h"
#import "IOSNativeToast.h"

@interface PokemonsToast()

@property (nonatomic, retain) IOSNativeToast *toast;

@end

@implementation PokemonsToast

- (instancetype)init {
    self = [super init];
    if (self) {
        self.toast = [[IOSNativeToast alloc] init];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(PokemonsToast)

RCT_EXPORT_METHOD(show:(NSString *)text duration:(NSInteger *)duration)
{
    [self.toast showToast:text];
}

@end
  
