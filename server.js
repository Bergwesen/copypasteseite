const http = require("http")
const path = require("path")
const fs = require("fs")
const uurl = require("url");
const { networkInterfaces } = require('os');
const ip = Object.values(networkInterfaces()).flat().find(net => net.family === 'IPv4' && !net.internal)?.address;




function isnumbers(n) {

	let val = true
	for (let i = 1; i < n.length; i++) {
		if (isNaN(n[i]) == true) {
			val = false
		}
	}
	return val
}


function newentry(thekey, thevalue) {
	const data = fs.readFileSync('data.json', 'utf8');
	const resdata = JSON.parse(data);
	resdata[thekey] = thevalue;
	console.log("Res");
	console.log(resdata[thekey]);
	fs.writeFileSync('data.json', JSON.stringify(resdata));
}





function getentry(thekey) {
	const data = fs.readFileSync('data.json', 'utf8');
	const resdata = JSON.parse(data);
	console.log(resdata[thekey]);
	if (resdata[thekey] === undefined) {
		resdata[thekey] = "";
	}
	return String(resdata[thekey]);
}






const server = http.createServer((req, res) => {


	const url = req.url;
	const method = req.method;

	//das bessere 
	const purl = uurl.parse(req.url, true);
	const purlname = purl.pathname;



	if (url == "/") {
		const filePath = path.join(__dirname, 'index.html');

		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal Server Error');
				return;
			}

			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(data);
		});
	}
	else if (url === "/style.css" && method === "GET") {
		const filePath = path.join(__dirname, 'style.css');

		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal Server Error');
				return;
			}

			res.writeHead(200, { 'Content-Type': 'text/css' });
			res.end(data);
		});

	}
	else if (url === "/script.js" && method === "GET") {
		const filePath = path.join(__dirname, 'script.js');

		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal Server Error');
				return;
			}

			res.writeHead(200, { 'Content-Type': 'text/javascript' });
			res.end(data);
		});

	}

	else if (purlname === "/data" && method === "GET") {

		const tablekey = purl.query.id;
		//console.log(tablekey);
		//console.log(getentry(tablekey));
		let data = getentry(tablekey);
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(data);

	}
	else if (url === "/a.jpg" && method === "GET") {
		const filePath = path.join(__dirname, 'a.jpg');

		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'image/jpeg' });
				res.end('Internal Server Error');
				return;
			}

			res.writeHead(200, { 'Content-Type': 'image/jpeg' });
			res.end(data);

		});
	}
	else if (isnumbers(url)) {
		if (method === "GET") {
			const filePath = path.join(__dirname, 'numbers.html');

			fs.readFile(filePath, (err, data) => {
				if (err) {
					res.writeHead(500, { 'Content-Type': 'text/html' });
					res.end('Internal Server Error');
					return;
				}

				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(data);

			});
		} else if (method == "POST") {
			console.log("asdfa");

			let valv = "";
			req.on('data', chunk => {
				//console.log('Received data chunk:', chunk);
				//	console.log('Received data chunk:', chunk);
				valv += chunk.toString();
			});

			req.on('end', () => {
				//	console.log('daten da' + valv);

				const filePath = path.join(__dirname, 'numbers.html');

				//	console.log("ffffff");
				//	console.log(url.slice(1));
				//	console.log(valv.slice(9));
				if (valv === undefined) {
					valv = "";
				}
				valv = valv.slice(9);
				valv = valv.replace(/\+/g, ' ');
				newentry(String(url.slice(1)), valv);

				fs.readFile(filePath, (err, data) => {
					if (err) {
						res.writeHead(500, { 'Content-Type': 'text/html' });
						res.end('Internal Server Error');
						return;
					}
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.end(data);
				});


			});
		}
	}










	//	console.log(ip);
});


server.listen(3000, ip, () => {
	console.log("Server laueft");
});
