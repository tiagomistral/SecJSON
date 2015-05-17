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
});
