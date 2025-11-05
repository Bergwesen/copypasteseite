//Erzeugt eine zufaellige Zahl und ihre Seite
function buf() {

	let wert = Math.floor(Math.random() * 1000);
	console.log(wert)
	//window.location.href = "http://localhost:3000/" + (wert).toString();
	window.location.href = "http://" + window.location.hostname + ":" + window.location.port + "/" + (wert).toString();
}


//Springt zur Seite der Eingabe
function openbuf() {
	let eingabe = document.getElementById("Eingabe").value;
	//	window.location.href = "http://localhost:3000/" + eingabe.toString();
	window.location.href = "http://" + window.location.hostname + ":" + window.location.port + "/" + eingabe.toString();
}




