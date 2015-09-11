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
  var id = json.id;
	//console.log(json);

    /*
    * Decrypt message
    */
    console.time("dbsave");
	  secjson.jsonDecrypt(json.json, json.id, decryptOptions, function(err, dec) {
		json = JSON.stringify(dec);
    console.timeEnd("dbsave");
	  //console.log(JSON.stringify(dec));
    // write back something interesting to the user:
  res.writeHead(200);
  res.end(id);
	});
    //console.log(json);
  })

  
};

//console.log(process.argv[2]);

http.createServer(serverBehavior).listen(process.argv[2]);
//http.createServer(serverBehavior).listen(8001);
//http.createServer(serverBehavior).listen(8002);
//http.createServer(serverBehavior).listen(8003);