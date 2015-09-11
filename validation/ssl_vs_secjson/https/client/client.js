process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var https = require('https');
var fs = require('fs');

var requestData = {
    "teste": 132
  };

var options = {
  hostname: 'localhost',
  port: 8000,
  path: '/',
  method: 'POST',
  headers: {
        'Content-Type': 'application/json'
    }
};

var lista = [{"port": 8000, "json": {"8000": "teste8000"}},
{"port": 8001, "json": {"8001": "teste8001"}},
{"port": 8002, "json": {"8002": "teste8002"}},
{"port": 8003, "json": {"8003": "teste8003"}},
{"port": 8004, "json": {"8004": "teste8004"}}];

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

var obj = JSON.parse(fs.readFileSync(__dirname +'/../../FileTests/simpleteste.js', 'utf8'));

//console.time("dbsave");
//for (index = 0; index < lista.length; ++index) {
var index = process.argv[2];
  var xpto = "[" + index + "]";
  console.time(xpto);//teste
  options.port = lista[index].port;
  var req = https.request(options, requestFunction);
  //req.write(JSON.stringify(obj[index]));
  req.write(JSON.stringify({
    "id": xpto,
    "json": JSON.stringify(obj[index])
  }));
  req.end();
//}


//console.log(obj);