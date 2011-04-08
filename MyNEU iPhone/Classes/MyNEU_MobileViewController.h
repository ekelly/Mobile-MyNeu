//
//  MyNEU_MobileViewController.h
//  MyNEU Mobile
//
//  Created by Wylie on 3/23/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface MyNEU_MobileViewController : UIViewController <UIWebViewDelegate> {
	IBOutlet UIWebView *webView;
}

@property(nonatomic, retain) UIWebView *webView;

@end

