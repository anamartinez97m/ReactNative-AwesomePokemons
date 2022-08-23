#import "PokemonsToast.h"

@implementation PokemonsToast

RCT_EXPORT_MODULE(PokemonsToast)

RCT_EXPORT_METHOD(show:(NSString *)message time:(NSInt *)time)
{
  UIAlertController * alert=[UIAlertController 
				alertControllerWithTitle:nil
                             	message:@""
                             	preferredStyle:UIAlertControllerStyleAlert];
    UIView *firstSubview = alert.view.subviews.firstObject;
    UIView *alertContentView = firstSubview.subviews.firstObject;
    
    for (UIView *subSubView in alertContentView.subviews) { 
    	subSubView.backgroundColor = [UIColor colorWithRed:141/255.0f green:0/255.0f blue:254/255.0f alpha:1.0f];
    }
    NSMutableAttributedString *AS = [[NSMutableAttributedString alloc] initWithString:Message];
    [AS addAttribute: NSForegroundColorAttributeName value: [UIColor whiteColor] range: NSMakeRange(0,AS.length)];
    [alert setValue:AS forKey:@"attributedTitle"];
    [self presentViewController:alert animated:YES completion:nil];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [alert dismissViewControllerAnimated:YES completion:^{
        }];
    });
}

@end