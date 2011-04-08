function transactions() {
	var start = document.getElementsByTagName('p')[3];
    var tablerows = start.getElementsByTagName('tr');
    document.body = document.createElement('body');
    var t = document.createElement('table');
    var tb = document.createElement('tbody');
    tb.appendChild(tablerows[0]);
    tb.appendChild(tablerows[1]);
    t.appendChild(tb);
    document.body.appendChild(t);
}
transactions();