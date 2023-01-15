var last_tab = 1;

function loadTab(tab_number)
{
	if (tab_number === last_tab) return;
	
	document.getElementById("tab" + last_tab).style.display = "none";
	document.getElementById("tab" + tab_number).style.display = "block";
	document.getElementById("tab-button" + last_tab).style.opacity = "0.5";
	document.getElementById("tab-button" + tab_number).style.opacity = "1.0";

	last_tab = tab_number;
}


function postData(data) 
{
	let xml = new XMLHttpRequest();
    xml.open("POST", "/host", true);
	xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xml.send("json="+data);
} 


function editRow(n)
{	
	var buttonName = document.getElementById(n).innerText;
	n = parseInt(n);
	var len = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].childElementCount-2;

	switch(buttonName) {
		case 'Edit!' :
			for (var i=1; i<len; i++) 
			{
				var label = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[i].getElementsByTagName('label')[0];
				var input = document.createElement("input");
				input.setAttribute('size', '5');
				input.value = label.innerText;
				label.replaceWith(input);
			}
			document.getElementById(n).innerText = "Save!";
			break;

		case 'Save!' : 
			var jsonString = '{"magazyn":[';

			var prodId= document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[0].getElementsByTagName('label')[0];
			jsonString += `{"val":"${prodId.innerText}"},`;
			
			for (var i=1; i<len; i++) 
			{
				var edit = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[i].getElementsByTagName('input')[0];
				var label = document.createElement("label");
				label.setAttribute('size', '5');
				jsonString += `{"val":"${edit.value}"},`;
				label.innerText = edit.value;
				edit.replaceWith(label);
			}
			jsonString = jsonString.slice(0, -1);
			jsonString += ']}';

			let form = document.createElement("form");
			form.method = "post";
			form.action = "/host";
			document.body.appendChild(form);

			var hiddeninput = document.createElement("input");
			hiddeninput.setAttribute("type", "hidden");
			hiddeninput.setAttribute("name", "json");
			hiddeninput.setAttribute("value", jsonString);
			form.appendChild(hiddeninput);

			form.submit();

			//postData(jsonString);

			document.getElementById(n).innerText = "Edit!";
			break;
		default:
			console.log("ERROR: WRONG BUTTON NAME!");
	}
}