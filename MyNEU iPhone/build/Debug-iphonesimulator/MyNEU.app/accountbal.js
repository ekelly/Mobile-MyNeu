function currBal() {
	var titles = ["Husky Dollars","Dining Dollars","Free Print Allowance","Laundry Bucks"];
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
}
currBal();