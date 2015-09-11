var fs = require('fs');

fs.readFile("mustang.jpg", function(err, data) {
   var base64data = new Buffer(data).toString('base64');
   console.log(base64data);
});