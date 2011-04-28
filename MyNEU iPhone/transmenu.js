function transMenu() {
	/* ACCOUNTS MENU */
	document.body = document.createElement('body'); 
	document.body.style.margin = '20px'; 
	links = []; 
	urls = {
			'Husky Dollars': 'https://prod-web.neu.edu/webapp6/ISF/cardTxns.do?view=svc&page=0&sort=', 
			'Dining Dollars': 'https://prod-web.neu.edu/webapp6/ISF/cardTxns.do?view=meal&page=0&sort=', 
			'Laundry Bucks': 'https://prod-web.neu.edu/webapp6/ISF/cardTxns.do?view=laundry&page=0&sort=', 
			'Print Allowance': 'https://prod-web.neu.edu/webapp6/ISF/cardTxns.do?view=printing&page=0&sort=',
	};
	// write new content
	for(var i in urls) {
		var link = document.createElement('div');
		var innerLink =
		'<a href="' + urls[i] + '" style="display: block; width:100%; line-height: 40px; text-align: center; margin-bottom: 15px; -webkit-border-radius: 5px; border: 1px solid #000; color: #333; font-family: Verdana, sans-serif; font-size: 18px; font-weight: bold; text-decoration: none; text-shadow: 0 1px #fff; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#E5E5E5), color-stop(50%,#D6D6D6), color-stop(51%,#C6C6C6), color-stop(100%,#DBDBDB));">' + i + '</a>';
		link.innerHTML = innerLink;
		
		document.body.appendChild(link);
		/*links.push(document.createElement('a'));
		links[links.length-1].href = urls[i];
		links[links.length-1].innerHTML = '<div style="display: block; width:100%; line-height: 40px; text-align: center; margin-bottom: 10px; -webkit-border-radius: 5px; border: 1px solid #000; color: #333; font-size: 18px; font-weight: bold; text-shadow: 0 1px #fff; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#E5E5E5), color-stop(50%,#D6D6D6), color-stop(51%,#C6C6C6), color-stop(100%,#DBDBDB));">' + i + '</div>';
		document.body.appendChild(links[links.length-1]);*/
	}
	// Add space for the logout button
	/*document.body.appendChild(document.createElement('br'));
	var back = 'http://myneu.neu.edu/render.userLayoutRootNode.uP?uP_root=root';
	var lo = document.createElement('a');
	lo.href = back;
	lo.innerHTML = '<div style="width:100%; height: 50px; -webkit-border-radius: 5px; color: white; font-weight: bold; text-shadow: 1px 1px #666; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#999), color-stop(100%,#333)); border: 1px solid red; text-color: black; text-align: center; line-height: 50px; margin-bottom: 10px;">Back</div>';
	document.body.appendChild(lo);*/
}
transMenu();