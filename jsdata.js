
const fs = require('fs');


//fuegt Text hinzu
function newentry(thekey, thevalue) {
	const data = fs.readFileSync('data.json', 'utf8');
	const resdata = JSON.parse(data);
	resdata[thekey] = thevalue;
	fs.writeFileSync('data.json', JSON.stringify(resdata));
}




//Gibt Text aus
function getentry(thekey) {
	const data = fs.readFileSync('data.json', 'utf8');
	const resdata = JSON.parse(data);
	//console.log(resdata[thekey]);
	if (resdata[thekey] === undefined) {
		resdata[thekey] = "";
	}
	fs.writeFileSync('data.json', JSON.stringify(resdata));
	return String(resdata[thekey]);
}





