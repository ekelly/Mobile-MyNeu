function currBal() {
	var titles = ["Husky Dollars","Dining Dollars","Free Print Allowance","Laundry Bucks"];
    var parents = document.getElementsByTagName('blockquote');
    var tables = [];
    for(var i = 0; i < parents.length; i++) {
        var t = parents[i].getElementsByTagName('table')[0];
		tables.push(t); // this element is undefined in some cases
    }
    document.body.innerHTML = "";
	for(var i in titles) {
        if(tables[i] != undefined) {
			var t = document.createElement('h3');
			t.innerHTML = titles[i]; 
			document.body.appendChild(t);
			document.body.appendChild(tables[i]);
		}
    }
}
currBal();