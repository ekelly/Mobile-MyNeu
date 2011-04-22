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
@synthesize titleBar;
@synthesize backButton;
@synthesize spinner;

	
-(void) loadURL:(NSString *)location {
	NSURL *url = [[NSURL alloc] initWithString:location];
	NSURLRequest *request = [[NSURLRequest alloc] initWithURL: url];
	
	[webView loadRequest: request];
	
	[request release];
	[url release];
}
-(void) loadLoginURL {
	[self loadURL:@"http://myneu.neu.edu/cp/home/displaylogin"];
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
	
	/*NSLog(@"Cookies currently set:");
	NSHTTPCookie *cookie;
	for (cookie in [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookies]) {
		NSLog(@"<NSHTTPCookie %@>", cookie.name);
	}*/
	
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

	/*UIImageView* img = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"header.png"]];
	NSLog(@"<UIImage %@", [UIImage imageNamed:@"header.png"]);
	[titleBar insertSubview:img atIndex:0];
	[img release];*/
	
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
		
	[self loadLoginURL];
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

- (BOOL)stringContains:(NSString *)first string:(NSString *)other {
	return ([first rangeOfString:other].location != NSNotFound);
}
- (BOOL)urlContains:(NSString *)compare {
	NSString *url = [[webView.request URL] absoluteString];
	return [self stringContains:url string:compare];
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
		[self loadURL:@"http://myneu.neu.edu/render.userLayoutRootNode.uP?uP_root=root"];
	} else {
		[self loadLoginURL];
		//[self loadJS:@"login"];
	}
}

- (void)webViewDidStartLoad:(UIWebView *)wv {
	[spinner startAnimating];
	
	wv.hidden = TRUE;
}

- (void)webViewDidFinishLoad:(UIWebView *)wv {
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
	
	backButton.enabled = TRUE;
	//if(![self urlContains:@"mail.google.com"]) {
	[self loadJS:@"style"];
	//}
	if([self urlContains:@"displaylogin"] ||
	    [self urlContains:@"cp/home/login"] ||
		[self urlContains:@"logout"] ||
		[self urlContains:@"jsp/misc"]) {
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
		[self loadJS:@"accountbal"];
	} else if([self urlContains:@"cardTxns.do?view="]) {
		[self loadJS:@"transactions"];
	} else if([self urlContains:@"cardTxns.do"]) {
		[self loadJS:@"transmenu"];
	} else {
		NSLog(@"Loading unknown URL");
		//[self loadJS:@"main"];
	}
}

- (void) webViewDidFailLoadWithError:(UIWebView *)wv {
	[spinner stopAnimating];
	
	NSLog(@"Error loading site <NSURlRequest %@>", [[wv.request URL] absoluteString]);
}

- (BOOL)webView:(UIWebView *)wv shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
	/*if([self stringContains:[[request URL] absoluteString] string:@"render.userLayoutRootNode.uP"]) {
		NSLog(@"Preventing load on <NSURLRequest %@>", [[request URL] absoluteString]);
		return NO;
	}*/
	
	return YES;
}

- (void) handleBack:(id)sender {
	NSLog(@"Tapped Back Button");
	
	/*if([self urlContains:@"HuskyCard/CurrentBalance"]) {
		[self loadMenuIfLoggedIn];
	} else if([self urlContains:@"cardTxns.do"]) {
		[self loadMenuIfLoggedIn];
	} else*/
	if([self urlContains:@"cardTxns.do?view="]) {
		[self loadURL:@"http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp/ISF/cardTxns.do"];
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
