// curl -k https://localhost:8000/
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('privatekey.pem'),
  cert: fs.readFileSync('certificate.pem')
};

function serverBehavior(req, res) {
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
    res.writeHead(200);
    res.end(JSON.parse(body).id);
   
  })

  // write back something interesting to the user:
  //console.log("done");
  };

https.createServer(options, serverBehavior).listen(8000);
https.createServer(options, serverBehavior).listen(8001);
https.createServer(options, serverBehavior).listen(8002);
https.createServer(options, serverBehavior).listen(8003);
https.createServer(options, serverBehavior).listen(8004);