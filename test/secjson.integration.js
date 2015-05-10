var assert = require('assert'),
    fs = require('fs'),
    xmlenc = require('../lib'),
    utils  = require('../lib/utils'),
    pki = require('node-forge').pki;

var crypto = require('crypto');

describe('integration', function() {

  it('should decrypt assertion with aes128', function (done) {
  	var payload = 'hello world';
    var rsa_pub = pki.publicKeyFromPem(fs.readFileSync(__dirname + '/test-auth0_rsa.pub'));
    var encrypted = rsa_pub.encrypt('simmetricKey'.toString('binary'), 'RSA-OAEP'); 
    var base64EncodedEncryptedKey = new Buffer(rsa_pub.encrypt('simmetricKey'.toString('binary'), 'RSA-OAEP'), 'binary').toString('base64');

    var pem = utils.pemToCert(fs.readFileSync(__dirname + '/test-auth0.pem').toString());

    var params = {
      encryptedKey:  base64EncodedEncryptedKey, 
      encryptionPublicCert: pem, 
      keyEncryptionMethod: 'http://www.w3.org/2001/04/xmlenc#rsa-1_5'
    };
  
    var result = utils.renderTemplate('keyinfo', params);
    console.log(result);

    crypto.encrypt(payload);
  	 //console.log(xmlenc.encrypt(payload));
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
    /*xmlenc.encryptKeyInfoWithScheme('password', options, 'RSA-OAEP', function(err, result) {
    	console.log(result);
    });*/
    done();
  });

});
