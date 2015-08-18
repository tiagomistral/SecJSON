process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var http = require('http');
var secjson = require('secjson'),
    fs = require('fs');
var lista = ["8000","8001","8002","8003"];

var requestData = {
    "8000": "teste8000",
    "8001": "teste8001",
    "8002": "teste8002",
    "8003": "teste8003"
  };

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
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
  req.on('error', function(e) {
    console.error(e);
  });
}

console.time("dbsave");
//encrypt data
for (index = 0; index < lista.length; ++index) {
  secjson.jsonEncrypt(requestData, lista[index], enc_options, function(err, encryptJsonObject) { 
      //console.log(JSON.stringify(encryptJsonObject));
      requestData = encryptJsonObject;
  });
};
//send data
for (index = 0; index < lista.length; ++index) {
  options.port = lista[index];
  var req = http.request(options, requestFunction);
  req.write(JSON.stringify({
    "id": lista[index],
    "json": requestData
  }));
  req.end();
}
console.timeEnd("dbsave");