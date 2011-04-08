//
//  MyNEU_MobileAppDelegate.h
//  MyNEU Mobile
//
//  Created by Wylie on 3/23/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@class MyNEU_MobileViewController;

@interface MyNEU_MobileAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
    MyNEU_MobileViewController *viewController;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet MyNEU_MobileViewController *viewController;

@end

