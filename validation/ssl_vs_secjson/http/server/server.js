var http = require('http');
var fs = require('fs');
var secjson = require('secjson');

function serverBehavior(req, res) {
	var decryptOptions = {
  		key: fs.readFileSync(__dirname + '/test-auth0.key')
	};

	var body = '';
  // we want to get the data as utf8 strings
  // If you don't set an encoding, then you'll get Buffer objects
  req.setEncoding('utf8');

  // Readable streams emit 'data' events once a listener is added
  req.on('data', function (chunk) {
    body += chunk;
  });

  // the end event tells you that you have entire body
  req.on('end', function () {
	//console.log(body);
	var json = JSON.parse(body);
	//console.log(json);

    /*
    * Decrypt message
    */
	secjson.jsonDecrypt(json.json, json.id, decryptOptions, function(err, dec) { 
		json = JSON.stringify(dec);
	  //console.log(JSON.stringify(dec));
	});
    console.log(json);
  })

  // write back something interesting to the user:
  res.writeHead(200);
  res.end("JSON received\n");
};

http.createServer(serverBehavior).listen(8000);
http.createServer(serverBehavior).listen(8001);
http.createServer(serverBehavior).listen(8002);
http.createServer(serverBehavior).listen(8003);