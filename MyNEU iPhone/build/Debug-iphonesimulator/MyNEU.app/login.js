/* LOGIN FORM
USING SCRIPT FROM "MyNEU PROPER LOGIN v0.6" BY brainonfire.net */

function showUsername() {
	//alert(document.getElementById('username').value);
	//return false;
}

var uuid = /document\.cplogin\.uuid\.value="([0-9a-f-]{36})";/.exec(document.getElementsByTagName('head')[0].innerHTML)[1];

var submitTo = document.getElementsByName('cplogin')[0].action;
var submitTo_safe = submitTo.replace(/"/g, '&quot;');
var properForm =
									 '<form action="%FormAction%" method="post" id="loginform" onSubmit="showUsername()"> \
									 <input type="text" name="user" id="username" value="" placeholder="MyNEU Username" style="width: 92%; font-size: 18px; margin-bottom: 10px;"/><br> \
									 <input type="password" name="pass" placeholder="Password" style="width: 92%; font-size: 18px;"/><br> \
	<input type="hidden" name="uuid" value="%UUID%" /> \
									 <button style="width:100%; font-size: 18px; margin-top:20px;">Login</button> \
	</form>'.replace('%FormAction%', submitTo_safe).replace('%UUID%', uuid);

document.body.innerHTML = properForm;

