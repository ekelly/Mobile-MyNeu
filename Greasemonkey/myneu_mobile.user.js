// MyNEU Mobile website
// Wylie Conlon and Eric Kelly

// ==UserScript==
// @name           MyNEU Mobile
// @namespace      http://crew.ccs.neu.edu
// @description    Cleans up MyNEU website
// @include        http://myneu.neu.edu/*
// @include        https://myneu.neu.edu/*
// @include        https://prod-web.neu.edu/*
// ==/UserScript==

/* XPATH HELPER
   From http://wiki.greasespot.net/Code_snippets */
function $x(p, context) {
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

var content = [];
function showContent() {
	Array.forEach(content, function(el) {
		document.body.appendChild(el);
	});
}
/*
function OpenWinNEU(url) {
	if(navigator.cpChildWindowList == null)	
	myneuWindow = window.open (url,"myneuWindow","resizable,scrollbars,status,");
	setTimeout ("myneuWindow.focus ()", 500);
	navigator.cpChildWindowListnavigator.cpChildWindowList.length = myneuWindow;
}
*/
function loadHandler(event) {
	var url = window.location.pathname;

	/* Useful URLS:
	Login: http://myneu.neu.edu/cp/home/displaylogin
	Content: render.userLayoutRootNode.uP
	Logged out: jsp/misc/timedout2.jsp
	Transition page: http://myneu.neu.edu/cp/home/logout
	*/
	
	if(url.search("render.userLayoutRootNode.uP") != -1) {
	
		/* MAIN MENU */
	
        document.body = document.createElement('body');
        document.body.style.margin = '20px';
		links = [];
		urls = {
			//'Accounts': "javascript:OpenWinNEU(\'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do\');",
			'Accounts': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do',
			'Transactions': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp/ISF/cardTxns.do',
			'Mail': 'http://myneu.neu.edu/cp/ip/login?sys=google&url=http://mail.google.com/a/husky.neu.edu',
//			'Blackboard': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://blackboard.neu.edu',
			'Schedule': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://bnr8ssbp.neu.edu/udcprod8/bwskfshd.P_CrseSchdDetl',
		};
		// write new content
		for(var i in urls) {
			links.push(document.createElement('a'));
			links[links.length-1].href = urls[i];
			links[links.length-1].innerHTML = '<div style="width:100%; height: 50px; background-color: lightgrey; text-align: center; line-height: 50px; margin-bottom: 10px;">' + i + '</div>';
			document.body.appendChild(links[links.length-1]);
			// document.body.appendChild(document.createElement('br'));
		}
        
        // Add space for the logout button
		// document.body.appendChild(document.createElement('br'));
		document.body.appendChild(document.createElement('br'));
		var logout = 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://myneu.neu.edu/up/Logout';
		var lo = document.createElement('a');
		lo.href = logout;
		lo.innerHTML = '<div style="width:100%; height: 50px; border: 1px solid red; text-color: black; text-align: center; line-height: 50px; margin-bottom: 10px;">Logout</div>';
		document.body.appendChild(lo);
        
	} else if(url.search("HuskyCard/CurrentBalance") != -1) {
                
        var titles = ["Husky Dollars","Dining Dollars","Free Print Allowance","Laundry Bucks"];
        var arr = [];
        var parent = document.getElementsByTagName('blockquote');
        var tables = [];
        for(var i = 0; i < parent.length; i++) {
            var t = parent[i].getElementsByTagName('table')[0];
            tables.push(t);
        }
        document.body = document.createElement('body');
        for(var i in titles) {
            var t = document.createElement('h3');
            t.innerHTML = titles[i]; 
            document.body.appendChild(t);
            document.body.appendChild(tables[i]);
        }
        
    } else if(url.search("cardTxns.do?") != -1) {

        var start = document.getElementsByTagName('p')[3];
        var tablerows = start.getElementsByTagName('tr');
        document.body = document.createElement('body');
        var t = document.createElement('table');
        var tb = document.createElement('tbody');
        tb.appendChild(tablerows[0]);
        tb.appendChild(tablerows[1]);
        t.appendChild(tb);
        document.body.appendChild(t);

} else {
	
		/* LOGIN FORM
		   USING SCRIPT FROM "MyNEU PROPER LOGIN v0.6" BY brainonfire.net */
		var uuid = /document\.cplogin\.uuid\.value="([0-9a-f-]{36})";/.exec(document.getElementsByTagName('head')[0].innerHTML)[1];
		
		var submitTo = document.getElementsByName('cplogin')[0].action;
		var submitTo_safe = submitTo.replace(/"/g, '&quot;');
		
		var properForm =
		'<form action="%FormAction%" method="post"> \
			<label>Username: <input type="text" name="user" value="" /></label><br> \
			<label>Password: <input type="password" name="pass" /></label><br> \
			<input type="hidden" name="uuid" value="%UUID%" /> \
			<button style="width:100%; height:50px; margin-top:20px;">Login</button> \
		</form>'.replace('%FormAction%', submitTo_safe).replace('%UUID%', uuid);
		
		document.body.innerHTML = properForm;	
	}
}

window.addEventListener('load', loadHandler, false);