function portal() {
	/* MAIN MENU */
	
    document.body.innerHTML = "";
    //document.body.style.margin = '20px';
	links = [];
	urls = {
		'Accounts': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do',
		'Transactions': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp/ISF/cardTxns.do',
		'Mail': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://myneu.neu.edu/cp/ip/login?sys=google&url=http://mail.google.com/a/husky.neu.edu',
	};
	// write new content
	for(var i in urls) {
		var link = document.createElement('div');
		var innerLink =
		'<a href="' + urls[i] + '" style="display: block; width:100%; line-height: 40px; text-align: center; margin-bottom: 10px; -webkit-border-radius: 5px; border: 1px solid #000; color: #333; font-size: 18px; font-weight: bold; text-shadow: 0 1px #fff; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#E5E5E5), color-stop(50%,#D6D6D6), color-stop(51%,#C6C6C6), color-stop(100%,#DBDBDB));">' + i + '</a>';
		link.innerHTML = innerLink;
		
		document.body.appendChild(link);
	}
}
portal();