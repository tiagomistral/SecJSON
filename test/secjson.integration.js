var assert = require('assert'),
    fs = require('fs'),
    xmlenc = require('../lib');

var crypto = require('crypto');

describe('integration', function() {

  it('should decrypt assertion with aes128', function (done) {
  	var payload = 'hello world';
  	//xmlenc.encrypt(payload);
	//assert.equal(xmlenc.decrypt(xmlenc.encrypt(payload)), payload);
    done();
  });

  it('encryptKeyInfoWithScheme', function(done){
  	var options = {
      rsa_pub: fs.readFileSync(__dirname + '/test-auth0_rsa.pub'),
      pem: fs.readFileSync(__dirname + '/test-auth0.pem'),
      key: fs.readFileSync(__dirname + '/test-auth0.key'),
      encryptionAlgorithm: 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc',
      keyEncryptionAlgorighm: 'http://www.w3.org/2001/04/xmlenc#rsa-1_5'
    };
    xmlenc.encryptKeyInfoWithScheme('password', options, 'RSA-OAEP', function() {

    	//console.log('callback');
	});
    done();
  });

});
