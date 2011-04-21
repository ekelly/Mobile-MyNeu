//
//  MyNEU_MobileViewController.m
//  MyNEU Mobile
//
//  Created by Wylie on 3/23/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "MyNEU_MobileViewController.h"

@implementation MyNEU_MobileViewController

@synthesize webView;
@synthesize backButton;
@synthesize spinner;

-(void) loadURL {
	NSURL *url = [[NSURL alloc] initWithString: @"http://myneu.neu.edu/cp/home/displaylogin"];
	NSURLRequest *request = [[NSURLRequest alloc] initWithURL: url];
	
	[webView loadRequest: request];
	
	[request release];
	[url release];
}

-(void) showAlert:(NSString *)msg {
	UIAlertView *alert = [[UIAlertView alloc]
						  initWithTitle:@"Alert"
						  message:msg
						  delegate:self
						  cancelButtonTitle:@"Dismiss"
						  otherButtonTitles: nil];
	[alert show];
	[alert release];
}

-(void) loadJS:(NSString *)fileName{
	NSString *filePath = [[NSBundle mainBundle]
						  pathForResource:fileName
						  ofType:@"js"
						  inDirectory:@""];
	NSData *fileData = [NSData dataWithContentsOfFile:filePath];
	NSString *jsString = [[NSString alloc]
						  initWithData:fileData
						  encoding:NSUTF8StringEncoding];
	
	NSLog(@"Loading %@.js", fileName);
	[webView stringByEvaluatingJavaScriptFromString:jsString];
	
	NSLog(@"Cookies currently set:");
	NSHTTPCookie *cookie;
	for (cookie in [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookies]) {
		NSLog(@"<NSHTTPCookie %@>", cookie.name);
	}
	
	[jsString release];
	//[fileData release];
	//[filePath release]; // causes crash when released
}

/*
// The designated initializer. Override to perform setup that is required before the view is loaded.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}
*/

/*
// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
}
*/


// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
	
	[webView setDelegate:self];
	[webView setOpaque:NO];
	[webView setScalesPageToFit:YES];

	UIScrollView* sv = nil;
	for(UIView* v in self.webView.subviews){
		if([v isKindOfClass:[UIScrollView class] ]){
			sv = (UIScrollView*) v;
			//sv.scrollEnabled = NO;
			sv.bounces = NO;
		}
	}
	
	//webView.backgroundColor = [UIColor clearColor];
	
	//self.view.backgroundColor = [[UIColor alloc] initWithPatternImage:[UIImage imageNamed:@"Default.png"]];
		
	[self loadURL];
}

// Override to allow orientations other than the default portrait orientation.
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
    //return (interfaceOrientation == UIInterfaceOrientationPortrait);
	return YES;
}

- (void)didReceiveMemoryWarning {
	// Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
	
	// Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
	// Release any retained subviews of the main view.
	// e.g. self.myOutlet = nil;
}

- (BOOL)urlContains:(NSString *)compare {
	NSString *url = [[webView.request URL] absoluteString];
	return ([url rangeOfString:compare].location != NSNotFound);
}

-(BOOL) isLoggedIn {
	NSHTTPCookie *cookie;
	for (cookie in [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookies]) {
		if([cookie.name isEqualToString:@"usid"]) {
			NSLog(@"Found a login cookie: %@", cookie);
			return YES;
		}
	}
	
	return NO;
}
- (void) loadMenuIfLoggedIn {
	if([self isLoggedIn]) {
		[self loadJS:@"main"];
	} else {
		[self loadJS:@"login"];
	}
}

- (void)webViewDidStartLoad:(UIWebView *)wv {
	NSLog(@"webViewDidStartLoad");
	
	[spinner startAnimating];
	
	wv.hidden = TRUE;
}

- (void)webViewDidFinishLoad:(UIWebView *)wv {
	NSLog(@"webViewDidFinishLoad");
	
	[spinner stopAnimating];
	
	wv.hidden = FALSE;
	
	NSString *url = [[wv.request URL] absoluteString];
	NSLog(@"<NSURLRequest %@>", url);
	
	/*NSString *filePath = [[NSBundle mainBundle]
						  pathForResource:@"Default"
						  ofType:@"png"
						  inDirectory:@""];	
	NSLog(@"Path to Default.png: %@", filePath);*/
	//[filePath release];
	
	[self loadJS:@"style"];
	backButton.enabled = TRUE;
	if([self urlContains:@"displaylogin"] ||
	    [self urlContains:@"cp/home/login"] ||
		[self urlContains:@"jsp/misc"]) {
		NSLog(@"Login page");
		if([self isLoggedIn]) {
			NSLog(@"Is logged in");
			[self loadJS:@"main"];
		} else {
			[self loadJS:@"login"];
		}
		
		backButton.enabled = FALSE;
	} else if([self urlContains:@"cp/home/next"] ||
			   [self urlContains:@"render.userLayoutRootNode.uP"]) {
		[self loadJS:@"main"];
		backButton.enabled = FALSE;
	} else if([self urlContains:@"HuskyCard/CurrentBalance"]) {
		//[self loadJS:@"accountbal"];
	} else if([self urlContains:@"cardTxns.do"]) {
		[self loadJS:@"transmenu"];
	} else if([self urlContains:@"cardTxns.do?view="]) {
		[self loadJS:@"transactions"];
	} else {
		NSLog(@"Loading unknown URL");
		//[self loadJS:@"main"];
	}
}

- (void) handleBack:(id)sender {
	NSLog(@"Tapped Back Button");
	
	if([self urlContains:@"HuskyCard/CurrentBalance"]) {
		[self loadJS:@"main"];
	} else if([self urlContains:@"cardTxns.do"]) {
		[self loadJS:@"main"];
	} else if([self urlContains:@"cardTxns.do?view="]) {
		[self loadJS:@"transmenu"];
	} else {
		[self loadMenuIfLoggedIn];
	}
}
- (void) handleMenu:(id)sender {
	NSLog(@"Tapped Menu Button");
	[self loadMenuIfLoggedIn];
}

- (void)dealloc {
    [super dealloc];
	self.webView = nil;
}

@end
