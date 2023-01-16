function delRow(n)
{											
	let form = document.createElement("form");
	form.method = "post";
	form.action = "/delete";
	document.body.appendChild(form);

	var hiddeninput = document.createElement("input");
	hiddeninput.setAttribute("type", "hidden");
	hiddeninput.setAttribute("name", "zawartosc_zamowienia");
	hiddeninput.setAttribute("value", n);
	form.appendChild(hiddeninput);

	form.submit();
} 