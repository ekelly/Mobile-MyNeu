function portal() {
	/* MAIN MENU */
	
    document.body = document.createElement('body');
    document.body.style.margin = '20px';
	links = [];
	urls = {
		'Accounts': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do',
		'Transactions': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp/ISF/cardTxns.do',
		'Mail': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://myneu.neu.edu/cp/ip/login?sys=google&url=http://mail.google.com/a/husky.neu.edu',
	};
	// write new content
	for(var i in urls) {
		links.push(document.createElement('a'));
		links[links.length-1].href = urls[i];
		links[links.length-1].style = 'text-decoration: none;';
		links[links.length-1].innerHTML = '<div style="width:100%; height: 50px;
			text-align: center; line-height: 50px; margin-bottom: 10px; 
			-webkit-border-radius: 5px; color: white; font-weight: bold;
			text-shadow: 1px 1px #666; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#C44), color-stop(100%,#933));">' + i + '</div>';
		document.body.appendChild(links[links.length-1]);
	}
}
portal();