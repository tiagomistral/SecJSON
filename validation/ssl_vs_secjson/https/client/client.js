process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var https = require('https');

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
{"port": 8003, "json": {"8003": "teste8003"}}];

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
for (index = 0; index < lista.length; ++index) {
  options.port = lista[index].port;
  var req = https.request(options, requestFunction);
  req.write(JSON.stringify(lista[index].json));
  req.end();
}
console.timeEnd("dbsave");