function portal() {
	/* MAIN MENU */
	
    document.body = document.createElement('body');
    document.body.style.margin = '20px';
	links = [];
	urls = {
		//'Accounts': "javascript:OpenWinNEU(\'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do\');",
		'Accounts': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do',
		'Transactions': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp/ISF/cardTxns.do',
		'Mail': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://myneu.neu.edu/cp/ip/login?sys=google&url=http://mail.google.com/a/husky.neu.edu',
//		'Blackboard': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://blackboard.neu.edu',
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
	//document.body.appendChild(document.createElement('br'));
	document.body.appendChild(document.createElement('br'));
	var logout = 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://myneu.neu.edu/up/Logout';
	var lo = document.createElement('a')
	lo.href = logout;
	lo.innerHTML = 'Logout';
	document.body.appendChild(lo);
}
portal();