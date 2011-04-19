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
	//webView.backgroundColor = [UIColor clearColor];
	
	self.view.backgroundColor = [[UIColor alloc] initWithPatternImage:[UIImage imageNamed:@"Default.png"]];
	
	
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

- (void)webViewDidFinishLoad:(UIWebView *)wv {
	NSLog(@"webViewDidFinishLoad");
	
	NSString *url = [[wv.request URL] absoluteString];
	NSLog(@"<NSURLRequest %@>", url);
	
	NSString *filePath = [[NSBundle mainBundle]
						  pathForResource:@"Default"
						  ofType:@"png"
						  inDirectory:@""];	
	NSLog(@"Path to Default.png: %@", filePath);
	//[filePath release];
	
	/*
	 Login: "displaylogin"
	 Portal: "cp/home/next" "render.userLayoutRootNode.uP"
	 Balance: "HuskyCard/CurrentBalance"
	 Transactions: "cardTxns.do"
	 */
	[self loadJS:@"style"];
	if([self urlContains:@"displaylogin"]) {
		NSLog(@"Login page");
		[self loadJS:@"login"];
	} else if([self urlContains:@"cp/home/next"] ||
			   [self urlContains:@"render.userLayoutRootNode.uP"]) {
		[self loadJS:@"main"];
	} else if([self urlContains:@"HuskyCard/CurrentBalance"]) {
		[self loadJS:@"accountbal"];
	} else if([self urlContains:@"cardTxns.do?view="]) {
		[self loadJS:@"transmenu"];
	} else if([self urlContains:@"cardTxns.do"]) {
		[self loadJS:@"transactions"];
	} else {
		NSLog(@"Loading unknown URL");
		//[self loadJS:@"main"];
	}
	
	/*if(url.contains((CharSequence)"displaylogin") || (url == "")) {
		Log.d("loadMyNeuJs","called on login");
		reformatLogin();
	} else if(url.contains((CharSequence)"cp/home/next") || 
			  url.contains((CharSequence) "render.userLayoutRootNode.uP?")) {
		Log.d("loadMyNeuJs","called on portal");
		Log.d("JS=", portalJs);
		formatPortal();
	} else if(url.contains((CharSequence)"HuskyCard/CurrentBalance")) {
		formatCurrBal();
		//		} else if((webview.findAll("Login Failed") != -1) || 
		//				(webview.findAll("Session timeout") != -1)) {
		//			Log.d("LoadMyNeuJs","login failed");
		//			webview.loadUrl(login);
	} else if(url.contains((CharSequence)"cardTxns.do")) {
		formatTransactions();
	} else {
		Log.d("loadMyNeuJs", "called on other page");
	}*/
	//[self loadJS:@"myneu_mobile"];
}

//- (void) handleBack:(id)sender {
//}
- (void) handleMenu:(id)sender {
	NSLog(@"Hit 'Menu' Button");
	[self loadJS:@"main"];
}


- (void)dealloc {
    [super dealloc];
	self.webView = nil;
}

@end
