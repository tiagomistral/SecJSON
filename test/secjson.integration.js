var assert = require('assert'),
    fs = require('fs'),
    secjson = require('../lib'),
    utils  = require('../lib/utils'),
    pki = require('node-forge').pki,
    crypto = require('crypto');

var crypto = require('crypto');

describe('integration', function() {

  it('encrypt & decrypt RSA 1.5', function (done) {

    var options = {
      rsa_pub: fs.readFileSync(__dirname + '/test-auth0_rsa.pub'),
      pem: fs.readFileSync(__dirname + '/test-auth0.pem'),
      key: fs.readFileSync(__dirname + '/test-auth0.key'),
      encryptionAlgorithm: 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc',
      keyEncryptionAlgorighm: 'http://www.w3.org/2001/04/xmlenc#rsa-1_5'
    };

    secjson.encrypt('content to encrypt', options, function(err, result) { 
       console.log(result);
       
       secjson.decrypt(result, options, function(err, dec) { 
        console.log(dec);
       });
    });

    done();
  });

  it('encrypt & decrypt RSA OAEP', function (done) {

    var options = {
      rsa_pub: fs.readFileSync(__dirname + '/test-auth0_rsa.pub'),
      pem: fs.readFileSync(__dirname + '/test-auth0.pem'),
      key: fs.readFileSync(__dirname + '/test-auth0.key'),
      encryptionAlgorithm: 'http://www.w3.org/2001/04/xmlenc#aes128-cbc',
      keyEncryptionAlgorighm: 'http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p'
    };

    secjson.encrypt('content to encrypt', options, function(err, result) { 
       console.log(result);
       
       secjson.decrypt(result, options, function(err, dec) { 
        console.log(dec);
       });
    });
    
    done();
  });

  it('jsonEncrypt & jsonDecrypt RSA OAEP', function (done) {

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

    var jsonKeyPath = 'store.book[1]';
    secjson.jsonEncrypt(obj, jsonKeyPath, options, function(err, result) { 
       console.log(JSON.stringify(result));

       secjson.jsonDecrypt(result, jsonKeyPath, options, function(err, dec) {
          console.log(JSON.stringify(dec));

       });
    });
    
    done();
  });
});