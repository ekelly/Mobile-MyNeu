package net.erickelly.portal;

import android.app.Activity;
import android.app.AlertDialog;

import android.app.ProgressDialog;
import android.content.ContentProviderOperation.Builder;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import android.graphics.Bitmap;

public class portal extends Activity {
    
	private WebView webview;
	private String login = "http://myneu.neu.edu/cp/home/displaylogin";
	private String home = "http://myneu.neu.edu/render.userLayoutRootNode.uP?uP_root=root";
	private String logout = "http://myneu.neu.edu/cp/ip/login?sys=was&url=http://myneu.neu.edu/up/Logout";
	private String transactions = "http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp/ISF/cardTxns.do";
	
	ProgressDialog dialog;
	Handler handle;
	Context context;
	
	// Javascript code to run
	String styleJs =
		"document.body.style.padding = \"0 5%\";\n" + 
		"document.body.style.background = \"#eee\";\n";
	String loginJs = 
			"function login() {\n" + 
			"// LOGIN FORM USING SCRIPT FROM \"MyNEU PROPER LOGIN v0.6\" BY brainonfire.net \n" + 
			"	\n" + 
			"	var uuid = /document\\.cplogin\\.uuid\\.value=\"([0-9a-f-]{36})\";/.exec(document.getElementsByTagName('head')[0].innerHTML)[1];\n" + 
			"	\n" + 
			"	var submitTo = document.getElementsByName('cplogin')[0].action;\n" + 
			"	var submitTo_safe = submitTo.replace(/\"/g, '&quot;');\n" + 
			"	\n" + 
			"	var properForm =\n" + 
			"		'<form action=\"%FormAction%\" method=\"post\" id=\"loginform\" onSubmit=\"showUsername()\"> \\\n" + 
			"		<input type=\"text\" name=\"user\" id=\"username\" value=\"\" placeholder=\"MyNEU Username\" style=\"width: 92%; font-size: 18px; margin-bottom: 5px;\"/><br> \\\n" + 
			"		<input type=\"password\" name=\"pass\" placeholder=\"Password\" style=\"width: 92%; font-size: 18px;\"/><br> \\\n" + 
			"		<input type=\"hidden\" name=\"uuid\" value=\"%UUID%\" /> \\\n" + 
			"		<button style=\"width:100%; height: 50px; font-size: 18px; margin-top:20px;\">Login</button> \\\n" + 
			"		</form>'.replace('%FormAction%', submitTo_safe).replace('%UUID%', uuid);\n" + 
			"	document.body.innerHTML = properForm;\n" + 
			"}\n" +
			"login();\n" + styleJs +
			"android.showPage();\n";
	/*
	String loginJs = 
		"document.body = document.createElement('body');\n" + 
		// will not work due to 'security issues'
		// see: http://stackoverflow.com/questions/5649111/android-webview-loading-javascript-file-in-assets-folder 
		"document.body.background = 'file:///android_asset/background_plain.png';\n" +
		"android.showPage();"; */
	String transMenu = 
			"function transMenu() {\n" +
			"/* ACCOUNTS MENU */\n" + 
			"	\n" + 
			"       document.body = document.createElement('body');\n" + 
			"       document.body.style.margin = '20px';\n" + 
			"		links = [];\n" + 
			"		urls = {\n" + 
			"			'Husky Dollars': 'https://prod-web.neu.edu/webapp6/ISF/cardTxns.do?view=svc&page=0&sort=',\n" + 
			"			'Dining Dollars': 'https://prod-web.neu.edu/webapp6/ISF/cardTxns.do?view=meal&page=0&sort=',\n" + 
			"			'Laundry Bucks': 'https://prod-web.neu.edu/webapp6/ISF/cardTxns.do?view=laundry&page=0&sort=',\n" + 
			"			'Print Allowance': 'https://prod-web.neu.edu/webapp6/ISF/cardTxns.do?view=printing&page=0&sort=',\n" + 
			"		};\n" + 
			"		// write new content\n" + 
			"		for(var i in urls) {\n" + 
			"			var link = document.createElement('div');\n" + 
			"			var innerLink =\n" + 
			"			'<a href=\"' + urls[i] + '\" style=\"display: block; width:100%; " +
			"				line-height: 40px; text-align: center; margin-bottom: 10px; " +
			"				-webkit-border-radius: 5px; border: 1px solid #000; color: #333; " +
			"				font-family: Verdana, sans-serif; font-size: 18px; font-weight: bold; " +
			"				text-decoration: none; text-shadow: 0 1px #fff; " +
			"				background: -webkit-gradient(linear, left top, left bottom, " +
			"					color-stop(0%,#E5E5E5), color-stop(50%,#D6D6D6), " +
			"					color-stop(51%,#C6C6C6), color-stop(100%,#DBDBDB));\">' + i + '</a>';\n" + 
			"			link.innerHTML = innerLink;\n" + 
			"			document.body.appendChild(link);" +
			"		}\n" + 
			"}\n" +
			"transMenu();\n" + styleJs +
			"android.showPage();";
	String portalJs = 
			"function portal() {\n" + 
			"/* MAIN MENU */\n" + 
			"	\n" + 
			"	document.body = document.createElement('body');\n" + 
			"   document.body.style.margin = '20px';\n" + 
			"	links = [];\n" + 
			"	urls = {\n" + 
			"		'Accounts': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do',\n" + 
			"		'Transactions': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp/ISF/cardTxns.do',\n" +
			"		'Mail': 'http://myneu.neu.edu/cp/ip/login?sys=google&url=http://mail.google.com/a/husky.neu.edu',\n" + 
			"	};\n" + 
			"	for(var i in urls) {\n" + 
			"		var link = document.createElement('div');\n" + 
			"		var innerLink =\n" + 
			"		'<a href=\"' + urls[i] + '\" style=\"display: block; width:100%; line-height: 40px; " +
			"			text-align: center; margin-bottom: 10px; -webkit-border-radius: 5px; " +
			"			border: 1px solid #000; color: #333; font-size: 18px; font-weight: bold; " +
			"			text-shadow: 0 1px #fff; background: -webkit-gradient(linear, left top, left bottom, " +
			"				color-stop(0%,#E5E5E5), color-stop(50%,#D6D6D6), color-stop(51%,#C6C6C6), " +
			"				color-stop(100%,#DBDBDB));\">' + i + '</a>';\n" + 
			"		link.innerHTML = innerLink;\n" + 
			"		\n" + 
			"		document.body.appendChild(link);" + 
			"	}\n" +
			"	// write new content\n" + 
			"}\n" + 
			"portal();\n" + styleJs + 
			"android.showPage();";
	String currBalJs = 
		"function currBal() {\n" + 
		"	var titles = [\"Husky Dollars\",\"Dining Dollars\",\"Free Print Allowance\",\"Laundry Bucks\"];\n" + 
		"   var parents = document.getElementsByTagName('blockquote');\n" + 
		"   var tables = [];\n" + 
		"   for(var i = 0; i < parents.length; i++) {\n" + 
		"   	var t = parents[i].getElementsByTagName('table')[0];\n" + 
		"       tables.push(t);\n" + 
		"   }\n" + 
		"   document.body = document.createElement('body');\n" + 
		"   for(var i in titles) {\n" +
        "		if(tables[i] != undefined) {\n" +
        "			var t = document.createElement('h3');\n" +
        "			t.innerHTML = titles[i];\n" +
        "			document.body.appendChild(t);\n" +
        "			document.body.appendChild(tables[i]);\n" +
        "		}\n" +
    	"	}\n" +
		"}\n" + 
		"currBal();\n" + styleJs +
		"android.showPage();";
	String formatTransactionPagesJs = 
		"function transactions() {\n" + 
		"	var start = document.getElementsByTagName('p')[3];\n" + 
		"   var tablerows = start.getElementsByTagName('tr');\n" + 
		"   document.body = document.createElement('body');\n" + 
		"   var t = document.createElement('table');\n" + 
		"   var tb = document.createElement('tbody');\n" + 
		"   tb.appendChild(tablerows[0]);\n" + 
		"   tb.appendChild(tablerows[1]);\n" + 
		"   t.appendChild(tb);\n" + 
		"   document.body.appendChild(t);\n" + 
		"}\n" + 
		"transactions();\n" +
		"android.showPage();";
	
	@Override
    public void onCreate(final Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Add progress bar
        getWindow().requestFeature(Window.FEATURE_PROGRESS);
        setContentView(R.layout.main);
        context = this.getApplicationContext();
        
        // Set Views
        webview = (WebView) findViewById(R.id.webView1);
        
        // Set up webview
        webview.setVerticalScrollBarEnabled(false);
        webview.setHorizontalScrollBarEnabled(false);
        webview.getSettings().setBlockNetworkImage(true);
        webview.getSettings().setJavaScriptEnabled(true);
        webview.addJavascriptInterface(new JsInterface(), "android");
        webview.setWebViewClient(new WebViewClient() {  
          @Override  
          public void onPageFinished(WebView view, String url){
        	  Log.d("Loading MyNeu Js", url);
        	  loadMyNeuJs();
          }
          @Override
          public void onPageStarted(WebView view, String url, Bitmap favicon) {
        	  if(isNetworkAvailable()) {
        		  webview.setVisibility(View.GONE);
        		  Log.d("URL request", url);
        	  } else {
        		  Toast.makeText(context, "Experiencing connectivity issues", Toast.LENGTH_LONG).show();
        		  webview.stopLoading();
        	  }
          }
          /* CAN POSSIBLY CUT OUT PAGE LOADING WITH shouldOverrideUrlLoading(Webview view, String url) */
        });
        final Activity activity = this;
        webview.setWebChromeClient(new WebChromeClient() {
        	@Override
        	public void onProgressChanged(WebView view, int progress) {
        		activity.setProgress(progress * 100);
        	}
        });
        webview.getSettings().setBuiltInZoomControls(false);
        
        handle = new Handler();
        
		webview.loadUrl(login);
    }
	
	//javascript interface
    private class JsInterface{
    	// makes the webview visable
    	public void showPage(){
    		handle.post(new Runnable() {
    			public void run() {
    				webview.setVisibility(View.VISIBLE);
    			}
    		});
    	}
    	public void alert(final String msg){
    		runOnUiThread(new Runnable() {
    			public void run() {
    				Toast t = Toast.makeText(context, msg, Toast.LENGTH_LONG);
    				t.show();
    			}
    		});
    	}
    }
	
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
	    if ((keyCode == KeyEvent.KEYCODE_BACK) && webview.canGoBack()) {
	    	String url = webview.getUrl();
	    	Log.d("URL equals", url);
	    	if(url.equals("https://prod-web.neu.edu/webapp6/ISF/cardTxns.do")) {
	    		webview.loadUrl(home);
	    	} else if(url.contains((CharSequence)"displaylogin")) {
	    		webview.loadUrl(login);
			} else if(url.contains((CharSequence)"cp/home/next")) {
				webview.loadUrl(home);
			} else if(url.contains((CharSequence)"HuskyCard/CurrentBalance")) {
				webview.loadUrl(home);
			} else if(url.contains((CharSequence)"cardTxns.do?view=")) {
				webview.loadUrl(transactions);
			} else if(url.contains((CharSequence)"mail.google.com")) {
				webview.loadUrl(home);
			} else {
				webview.goBack();
			}
	    	return true;
	    }
	    return super.onKeyDown(keyCode, event);
	}
	
	public void loadMyNeuJs() {
//	  	dialog.dismiss();
		String url = "";
		if (webview.getUrl() != null) {
			url = webview.getUrl();
		}
		Log.d("URL:", url);
		if(url.contains((CharSequence)"displaylogin") || (url == "")) {
			Log.d("loadMyNeuJs","called on login");
			reformatLogin();
		} else if(url.contains((CharSequence)"cp/home/next") || 
				url.contains((CharSequence) "render.userLayoutRootNode.uP?")) {
			Log.d("loadMyNeuJs","called on portal");
			Log.d("JS=", portalJs);
			formatPortal();
		} else if(url.contains((CharSequence)"HuskyCard/CurrentBalance")) {
			Log.d("LoadMyNeuJs","called on Accounts");
			formatCurrBal();
		} else if(url.contains((CharSequence)"jsp/misc")) {
			Log.d("LoadMyNeuJs","something went wrong");
			webview.loadUrl(login);
		} else if(url.contains((CharSequence)"cardTxns.do")) {
			Log.d("loadMyNeuJs","called on transactions page");
			formatTransactions();
		} else {
			Log.d("loadMyNeuJs", "called on other page");
      	  	webview.setVisibility(View.VISIBLE);
		}
	}
	
	private void formatTransactions() {
		
		if(webview.getUrl().contains((CharSequence)"?view=")) {
			webview.loadUrl("javascript:" + formatTransactionPagesJs);
			Log.d("formatTransactions","formatted page");
		} else {
			webview.loadUrl("javascript:" + transMenu);
		}
		Log.d("formatTransactions","ran");
	}

	private void formatCurrBal() {
		webview.loadUrl("javascript:" + currBalJs);
		Log.d("formatCurrBal", "called");
	}

	public void reformatLogin() {
		webview.loadUrl("javascript:" + loginJs);
		Log.d("reformatLogin","ran");
	}
	
	public void formatPortal() {
		webview.loadUrl("javascript:" + portalJs);
		Log.d("formatPortal","ran");
	}
	
	private boolean isNetworkAvailable() {
	    ConnectivityManager connectivityManager 
	          = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
	    NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
	    return activeNetworkInfo != null;
	}
	/*
	@Override
	public void onConfigurationChanged(Configuration newConfig) {
	    super.onConfigurationChanged(newConfig);
	}
	*/
	@Override
    public boolean onCreateOptionsMenu(Menu menu) {
       super.onCreateOptionsMenu(menu);
       MenuInflater inflater = getMenuInflater();
       inflater.inflate(R.menu.menu, menu);       
       return true;
    }
	
	@Override
    public boolean onOptionsItemSelected(MenuItem item) {
    	switch(item.getItemId()) {
    		case R.id.logout:
    			webview.setVisibility(View.GONE);
    			webview.loadUrl(logout);
    			webview.setVisibility(View.GONE);
    			webview.loadUrl(login);
    			break;
    		case R.id.home:
    			webview.setVisibility(View.GONE);
    			webview.loadUrl(home);
    			break;
    	}
    	   return true;
    }
	
	@Override
	public void onDestroy() {
		super.onDestroy();
		finish();
	}
	
}