[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
<!---[![Test coverage][coveralls-image]][coveralls-url]-->

Secure JSON implementation for node.js. 
SecJSON allow encrypt/decrypt a message or a specific value of an JSON object.

## Usage

    npm install secjson

### encrypt

~~~js
var secjson = require('secjson');

var options = {
	rsa_pub: fs.readFileSync(__dirname + '/test-auth0_rsa.pub'),
	pem: fs.readFileSync(__dirname + '/test-auth0.pem'),
	encryptionAlgorithm: 'http://tiagomistral.github.io/SecJSON#aes128-cbc',
	keyEncryptionAlgorighm: 'http://tiagomistral.github.io/SecJSON#rsa-oaep-mgf1p'
};

secjson.encrypt('content to encrypt', options, function(err, result) { 
	console.log(result);
}
~~~

Result:
~~~json
{
    "EncryptedData":{
        "EncryptionMethod":{
            "Algorithm":"http://tiagomistral.github.io/SecJSON#aes128-cbc"
        },
        "KeyInfo":{
            "EncryptedKey":{
                "EncryptionMethod":{
                    "Algorithm":"http://tiagomistral.github.io/SecJSON#rsa-oaep-mgf1p",
                    "DigestMethod":{
                        "Algorithm":"http://tiagomistral.github.io/SecJSON#sha1"
                    }
                },
                "KeyInfo": {
                   "RetrievalMethod": "MIIEDzCCAveg...[base64 cert]...q3uaLvlAUo="
                },
                "CipherData":{
                    "CipherValue":"Ad/F7DvLVc...[encrypted symmetric key]...0bb2VrjXcTZxQ=="
                }
            }
        },
        "CipherData":{
            "CipherValue":"g5HaGPWeQZ...[encrypted content]...4qYHVr5/pUQgjwVd"
        }
    }
}
~~~

### decrypt

~~~js

var decryptOptions = {
  key: fs.readFileSync(__dirname + '/test-auth0.key')
};

       
secjson.decrypt(encryptResult, decryptOptions, function(err, dec) { 
  console.log(dec);
});
~~~

Result:

~~~json

content to encrypt

~~~

### JSON encrypt

Encrypt the second book (Sword of Honour) of the object "obj".

~~~js

var options = {
      rsa_pub: fs.readFileSync(__dirname + '/test-auth0_rsa.pub'),
      pem: fs.readFileSync(__dirname + '/test-auth0.pem'),
      encryptionAlgorithm: 'http://tiagomistral.github.io/SecJSON#aes128-cbc',
      keyEncryptionAlgorighm: 'http://tiagomistral.github.io/SecJSON#rsa-oaep-mgf1p'
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

secjson.jsonEncrypt(obj, 'store.book[1]', options, function(err, encryptJsonObject) { 
	console.log(JSON.stringify(encryptJsonObject));
}
~~~

Result:

~~~json

{
    "store":{
        "book":[
            {
                "category":"reference",
                "author":"Nigel Rees",
                "title":"Sayings of the Century",
                "price":8.95
            },
            {
                "EncryptedData":{
                    "EncryptionMethod":{
                        "Algorithm":"http://tiagomistral.github.io/SecJSON#aes128-cbc"
                    },
                    "KeyInfo":{
                        "EncryptedKey":{
                            "EncryptionMethod":{
                                "Algorithm":"http://tiagomistral.github.io/SecJSON#rsa-oaep-mgf1p",
                                "DigestMethod":{
                                    "Algorithm":"http://tiagomistral.github.io/SecJSON#sha1"
                                }
                            },
                            "KeyInfo": {
                                "RetrievalMethod": "MIIEDzCCAveg...[base64 cert]...q3uaLvlAUo="
                            },
                            "CipherData":{
                                "CipherValue":"nBZdvu0Go+Qp...[encrypted symmetric key]...hoCJR5NVxOdgdJcGClg=="
                            }
                        }
                    },
                    "CipherData":{
                        "CipherValue":"1GV6RbZcWRAe...[encrypted content]...IjcyW6sGKAC8IqMsBBesw=="
                    }
                }
            },
            {
                "category":"fiction",
                "author":"Herman Melville",
                "title":"Moby Dick",
                "isbn":"0-553-21311-3",
                "price":8.99
            },
            {
                "category":"fiction",
                "author":"J. R. R. Tolkien",
                "title":"The Lord of the Rings",
                "isbn":"0-395-19395-8",
                "price":22.99
            }
        ],
        "bicycle":{
            "color":"red",
            "price":19.95
        }
    }
}
~~~


### JSON decrypt

~~~js

var decryptOptions = {
	key: fs.readFileSync(__dirname + '/test-auth0.key')
};

secjson.jsonDecrypt(encryptJsonObject, 'store.book[1]', decryptOptions, function(err, dec) {
	console.log(JSON.stringify(dec));
});

~~~

Result:

~~~json

{
   "store":{
      "book":[
         {
            "category":"reference",
            "author":"Nigel Rees",
            "title":"Sayings of the Century",
            "price":8.95
         },
         {
            "category":"fiction",
            "author":"Evelyn Waugh",
            "title":"Sword of Honour",
            "price":12.99
         },
         {
            "category":"fiction",
            "author":"Herman Melville",
            "title":"Moby Dick",
            "isbn":"0-553-21311-3",
            "price":8.99
         },
         {
            "category":"fiction",
            "author":"J. R. R. Tolkien",
            "title":"The Lord of the Rings",
            "isbn":"0-395-19395-8",
            "price":22.99
         }
      ],
      "bicycle":{
         "color":"red",
         "price":19.95
      }
   }
}

~~~

## Supported algorithms

Currently the library supports:

* EncryptedKey to transport symmetric key using:
  * http://tiagomistral.github.io/SecJSON#rsa-oaep-mgf1p
  * http://tiagomistral.github.io/SecJSON#rsa-1_5

* EncryptedData using:  
  * http://tiagomistral.github.io/SecJSON#aes128-cbc
  * http://tiagomistral.github.io/SecJSON#aes256-cbc
  * http://tiagomistral.github.io/SecJSON#tripledes-cbc

However, you can fork and implement your own algorithm. The code supports adding more algorithms easily

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.


## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/secjson.svg?style=flat-square
[npm-url]: https://npmjs.org/package/secjson
[github-tag]: http://img.shields.io/github/tag/tiagomistral/secjson.svg?style=flat-square
[github-url]: https://github.com/tiagomistral/secjson/tags
[travis-image]: https://img.shields.io/travis/tiagomistral/SecJSON.svg?style=flat-square
[travis-url]: https://travis-ci.org/tiagomistral/SecJSON
[license-image]: http://img.shields.io/npm/l/secjson.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/secjson.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/secjson
[david-image]: http://img.shields.io/david/tiagomistral/secjson.svg?style=flat-square
[david-url]: https://david-dm.org/tiagomistral/secjson
[coveralls-image]: https://coveralls.io/repos/tiagomistral/SecJSON/badge.svg
[coveralls-url]: https://coveralls.io/r/tiagomistral/SecJSON
