var jsonPath = require('JSONPath');
var assert = require('assert'),
    fs = require('fs'),
    secjson = require('../lib'),
    utils  = require('../lib/utils'),
    pki = require('node-forge').pki,
    crypto = require('crypto');

    var options = {
      rsa_pub: fs.readFileSync(__dirname + '/test-auth0_rsa.pub'),
      pem: fs.readFileSync(__dirname + '/test-auth0.pem'),
      key: fs.readFileSync(__dirname + '/test-auth0.key'),
      encryptionAlgorithm: 'http://www.w3.org/2001/04/xmlenc#aes128-cbc',
      keyEncryptionAlgorighm: 'http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p'
    };

 var obj = {
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
      }
    };



function jsonEncrypt(json, jsonKey, options, callback) {
  if (!json)
    return callback(new Error('must provide json object'));
  if (!jsonKey)
    return callback(new Error('must provide jsonKey to encrypt'));

  var key = jsonKey.split(".");
  var insideJson = json;

  key.forEach(function(entry, callback) {
      console.log(insideJson[entry]);
      insideJson = insideJson[entry];
    });

  console.log("\nFiquei bloequeado\n");

  secjson.encrypt(JSON.stringify(insideJson), options, function(err, result) {
    console.log('RESULT:' + result);
    insideJson = result;
    console.log('Sera?' + JSON.stringify(json.store.book));
    callback(null, json);
  });
}

    console.log('WHYYYYYYY');

    var jsonKey = obj.store;


    
    var merda = obj['store']['bicycle'];
    console.log('\n\n\n\n\n' + JSON.stringify(merda));
    console.log('merda '+merda.price);

    var str = "/store.book[0]/teste2/teste3"
    var arr = str.split("/");
    console.log(arr);

    arr.forEach(function(entry) {
      console.log(entry);
      console.log(obj[entry]);
    });
    console.log("=========");
    key = "store.bicycle".split(".");
    var insideJson = obj;
    key.forEach(function(entry, callback) {
      console.log(insideJson[entry]);
      insideJson = insideJson[entry]
      
    });
console.log("\n\n\n=========\n\n\n");
    jsonEncrypt(obj, "store.book", options, function(err, teste) {
      console.log(teste);
    });
  
var chave = "store/book";
console.log("FODAAAA" + obj[chave]);

