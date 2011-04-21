//document.body.style.fontSize = "300%";
//document.body.style.width = "300px";
for(var sheet in document.styleSheets) {
	for(var rule in sheet.cssRules) {
		if(rule.selectorText.indexOf("a")==0) {
			rule.style = rule.style + "text-decoration: none;";
		} else if(rule.selectorText.indexOf("body")!=-1) {
			rule.style = "background: #eee;";
		}
	}
}

document.body.style.padding = "0 5%";

document.body.style.background = "#eee";

//alert(document.styleSheets[1]);

document.styleSheets[1].insertRule("body { background: #eee !important; }");
//document.styleSheets[1].insertRule("body { background: #eee; } a, a:hover, a:visited, a:active { color: #000 !important; text-decoration: none !important; }");
//document.body.style.background = "file:///Default.png";

document.body.style.fontFamily = "Helvetica, sans-serif";

//var newStyle = document.createElement


/*var h1 = document.createElement('h1');
h1.innerHTML = "MyNEU Mobile";
//h1.style.fontWeight = "bold";
h1.style.paddingBottom = "20px";
document.body.insertBefore(h1, document.body.firstChild);
*/
var viewport = document.createElement('meta');
viewport.name = "viewport";
viewport.content = "width=device-width";
document.getElementsByTagName('head').item(0).appendChild(viewport);