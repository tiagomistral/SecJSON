process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var http = require('http');
var secjson = require('secjson'),
    fs = require('fs');
var lista = ["8000","8001","8002","8003"];

var enc_options = {
    rsa_pub: fs.readFileSync(__dirname + '/test-auth0_rsa.pub'),
    pem: fs.readFileSync(__dirname + '/test-auth0.pem'),
    encryptionAlgorithm: 'http://tiagomistral.github.io/SecJSON#aes128-cbc',
    keyEncryptionAlgorighm: 'http://tiagomistral.github.io/SecJSON#rsa-oaep-mgf1p'
};



//console.log(JSON.stringify(requestData));

var options = {
  hostname: 'localhost',
  port: 8000,
  path: '/',
  method: 'POST',
  headers: {
        'Content-Type': 'application/json'
    }
};



function requestFunction(res) {
  //console.log("statusCode: ", res.statusCode);
  //console.log("headers: ", res.headers);

  res.on('data', function(d) {
    //process.stdout.write(d);
    console.timeEnd(d);
  });
  req.on('error', function(e) {
    console.error(e);
  });
}
var requestData = JSON.parse(fs.readFileSync(__dirname +'/../../FileTests/simpleteste.js', 'utf8'));

//encrypt data
for (index = 0; index < lista.length; ++index) {
  console.time("dbsave");
  var xpto = "[" + index + "]";
  secjson.jsonEncrypt(requestData, xpto, enc_options, function(err, encryptJsonObject) { 
      //console.log(JSON.stringify(encryptJsonObject));
      requestData = encryptJsonObject;
      console.timeEnd("dbsave");
  });
};


//send data
var index = process.argv[2];
//for (index = 0; index < lista.length; ++index) {
  var xpto = "[" + index + "]";
  console.time(xpto);//teste
  options.port = lista[index];
  var req = http.request(options, requestFunction);
  req.write(JSON.stringify({
    "id": xpto,
    "json": requestData
  }));
  req.end();
//}