function portal() {
	/* MAIN MENU */
	
    document.body.innerHTML = "";
	links = [];
	urls = {
		'Accounts': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do',
		'Transactions': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp/ISF/cardTxns.do',
		'Mail': 'http://myneu.neu.edu/cp/ip/login?sys=google&url=http://mail.google.com/a/husky.neu.edu',
		//'Blackboard': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://blackboard.neu.edu',
		//'Schedule': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://bnr8ssbp.neu.edu/udcprod8/bwskfshd.P_CrseSchdDetl',
	};
	// write new content
	for(var i in urls) {
		var link = document.createElement('div');
		var innerLink =
		'<a href="' + urls[i] + '" style="display: block; width:100%; line-height: 40px; text-align: center; margin-bottom: 15px; -webkit-border-radius: 5px; border: 1px solid #000; color: #333; font-size: 18px; font-weight: bold; text-shadow: 0 1px #fff; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#E5E5E5), color-stop(50%,#D6D6D6), color-stop(51%,#C6C6C6), color-stop(100%,#DBDBDB));">' + i + '</a>';
		link.innerHTML = innerLink;
		
		document.body.appendChild(link);
		
		//links.push(document.createElement('a'));
		//links[links.length-1].href = urls[i];
		//links[links.length-1].innerHTML = '<div style="width:100%; height: 50px; text-align: center; line-height: 50px; margin-bottom: 10px; -webkit-border-radius: 5px; color: white; font-weight: bold; text-shadow: 1px 1px #666; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#C44), color-stop(100%,#933));">' + i + '</div>';
		//document.body.appendChild(links[links.length-1]);
		// document.body.appendChild(document.createElement('br'));
	}
    
    // Add space for the logout button
	//document.body.appendChild(document.createElement('br'));
	/*document.body.appendChild(document.createElement('br'));
	var logout = 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://myneu.neu.edu/up/Logout';
	var lo = document.createElement('a')
	lo.href = logout;
	lo.innerHTML = 'Logout';
	document.body.appendChild(lo);*/
	
	var link = document.createElement('div');
	var innerLink =
	'<a href="http://myneu.neu.edu/cp/ip/login?sys=was&url=http://myneu.neu.edu/up/Logout" style="display: block; width:100%; line-height: 40px; text-align: center; margin-top: 30px; -webkit-border-radius: 5px; border: 1px solid #000; color: #fff; font-size: 18px; font-weight: bold; text-shadow: 0 -1px #666; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#900), color-stop(50%,#600), color-stop(51%,#500), color-stop(100%,#800));">Log Out</a>';
	link.innerHTML = innerLink;
	
	document.body.appendChild(link);
	
}
portal();