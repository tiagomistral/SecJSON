var crypto = require('crypto');
var async  = require('async');
var utils  = require('./utils');
var pki = require('node-forge').pki;

function encryptKeyInfoWithScheme(symmetricKey, options, scheme, callback) {
  // convert a PEM-formatted public key to a Forge public key 
  var rsa_pub = pki.publicKeyFromPem(options.rsa_pub);
  // encrypt the forge public key with the scheme algorithm
  var encrypted = rsa_pub.encrypt(symmetricKey.toString('binary'), scheme); 
  // encode the encrypt key to base 64
  var base64EncodedEncryptedKey = new Buffer(encrypted, 'binary').toString('base64');
  
  var params = {
    encryptedKey:  base64EncodedEncryptedKey, 
    encryptionPublicCert: '<X509Data><X509Certificate>' + utils.pemToCert(options.pem.toString()) + '</X509Certificate></X509Data>', 
    keyEncryptionMethod: options.keyEncryptionAlgorighm
  };
  
  var result = utils.renderTemplate('keyinfo', params);

  return callback(null, result);     
}

function encryptKeyInfo(symmetricKey, options, callback) {
  if (!options)
    return callback(new Error('must provide options'));
  if (!options.rsa_pub)
    return callback(new Error('must provide options.rsa_pub with public key RSA'));
  if (!options.pem)
    return callback(new Error('must provide options.pem with certificate'));
  
  if (!options.keyEncryptionAlgorighm)
    return callback(new Error('encryption without encrypted key is not supported yet'));

  switch (options.keyEncryptionAlgorighm) {
    case 'http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p':
      return encryptKeyInfoWithScheme(symmetricKey, options, 'RSA-OAEP', callback)

    case 'http://www.w3.org/2001/04/xmlenc#rsa-1_5':
      return encryptKeyInfoWithScheme(symmetricKey, options, 'RSAES-PKCS1-V1_5', callback)

    default:
      return callback(new Error('encryption key algorithm not supported'));
  }
}

function encrypt(content, options, callback) {
  if (!options)
    return callback(new Error('must provide options'));
  if (!content)
    return callback(new Error('must provide content to encrypt'));
  if (!options.rsa_pub)
    return callback(new Error('rsa_pub option is mandatory and you should provide a valid RSA public key'));
  if (!options.pem)
    return callback(new Error('pem option is mandatory and you should provide a valid x509 certificate encoded as PEM'));

  options.input_encoding = options.input_encoding || 'utf8';

  async.waterfall([
    function generate_symmetric_key(cb) {
      switch (options.encryptionAlgorithm) {
        case 'http://www.w3.org/2001/04/xmlenc#aes128-cbc':
          crypto.randomBytes(16, cb); // generate a symmetric random key 16 bytes length
          break;
        case 'http://www.w3.org/2001/04/xmlenc#aes256-cbc':
          crypto.randomBytes(32, cb); // generate a symmetric random key 32 bytes length
          break;
        case 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc':
          crypto.randomBytes(24, cb); // generate a symmetric random key 24 bytes (192 bits) length
          break;
        default:
          crypto.randomBytes(32, cb); // generate a symmetric random key 32 bytes length
      }
    },
    function encrypt_content(symmetricKey, cb) {
      switch (options.encryptionAlgorithm) {
        case 'http://www.w3.org/2001/04/xmlenc#aes128-cbc':
          encryptWithAlgorithm('aes-128-cbc', symmetricKey, 16, content, options.input_encoding, function (err, encryptedContent) {
            if (err) return cb(err);
            cb(null, symmetricKey, encryptedContent);
          });
          break;
        case 'http://www.w3.org/2001/04/xmlenc#aes256-cbc':
          encryptWithAlgorithm('aes-256-cbc', symmetricKey, 16, content, options.input_encoding, function (err, encryptedContent) {
            if (err) return cb(err);
            cb(null, symmetricKey, encryptedContent);
          });
          break;
        case 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc':
          encryptWithAlgorithm('des-ede3-cbc', symmetricKey, 8, content, options.input_encoding, function (err, encryptedContent) {
            if (err) return cb(err);
            cb(null, symmetricKey, encryptedContent);
          });
          break;
        default:
          cb(new Error('encryption algorithm not supported'));
      }
    },
    function encrypt_key(symmetricKey, encryptedContent, cb) {
      encryptKeyInfo(symmetricKey, options, function(err, keyInfo) {
        if (err) return cb(err);

        var result = utils.renderTemplate('encrypted-key', {
          encryptedContent: encryptedContent.toString('base64'),
          keyInfo: keyInfo,
          contentEncryptionMethod: options.encryptionAlgorithm
        });

        cb(null, result);
      });  
    }
  ], callback);
}

function decryptKeyInfoWithScheme(encryptedKey, options, scheme) {
  var key = new Buffer(encryptedKey.textContent, 'base64').toString('binary');
  var private_key = pki.privateKeyFromPem(options.key);
  var decrypted = private_key.decrypt(key, scheme);
  return new Buffer(decrypted, 'binary');
}

function encryptWithAlgorithm(algorithm, symmetricKey, ivLength, content, encoding, callback) {
  // create a random iv for algorithm
  crypto.randomBytes(ivLength, function(err, iv) {
    if (err) return callback(err);
    
    var cipher = crypto.createCipheriv(algorithm, symmetricKey, iv); 
    // encrypted content
    var encrypted = cipher.update(content, encoding, 'binary') + cipher.final('binary');
    return callback(null, Buffer.concat([iv, new Buffer(encrypted, 'binary')]));
  });
}

exports = module.exports = {
  encrypt: encrypt,
  encryptKeyInfo: encryptKeyInfo,
  encryptKeyInfoWithScheme: encryptKeyInfoWithScheme
};
