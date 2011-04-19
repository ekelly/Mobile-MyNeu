//document.body.style.fontSize = "300%";
//document.body.style.width = "300px";
//document.body.style.padding = "20px";

document.body.style.background = "#eee";
//document.body.style.background = "file:///Default.png";

document.body.style.fontFamily = "Helvetica, sans-serif";

var newStyle = document.createElement


var h1 = document.createElement('h1');
h1.innerHTML = "MyNEU Mobile";
//h1.style.fontWeight = "bold";
h1.style.paddingBottom = "20px";
document.body.insertBefore(h1, document.body.firstChild);

var viewport = document.createElement('meta');
viewport.name = "viewport";
viewport.content = "width=device-width";
document.getElementsByTagName('head').item(0).appendChild(viewport);