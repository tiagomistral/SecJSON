[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Secure JSON implementation for node.js

## Usage

    npm install secjson

### encrypt

SecJSON allow encrypt a message or a specific value of an JSON object.

Example 1: Encrypt the message 'content to encrypt':

~~~js
var secjson = require('secjson');

var options = {
	rsa_pub: fs.readFileSync(__dirname + '/test-auth0_rsa.pub'),
	pem: fs.readFileSync(__dirname + '/test-auth0.pem'),
	encryptionAlgorithm: 'http://www.w3.org/2001/04/xmlenc#aes128-cbc',
	keyEncryptionAlgorighm: 'http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p'
};

secjson.encrypt('content to encrypt', options, function(err, result) { 
	console.log(result);
}
~~~

Result:
~~~json
{
	"EncryptedData": {
		"EncryptionMethod": "http://www.w3.org/2001/04/xmlenc#aes128-cbc",
		"KeyInfo": {
  "EncryptedMethod": {
    "Algorithm": "http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"
  },
  "KeyInfo": "MIIEDzCCAvegAwIBAgIJALr9HwgrQ7GeMA0GCSqGSIb3DQEBBQUAMGIxGDAWBgNVBAMTD2F1dGgwLmF1dGgwLmNvbTESMBAGA1UEChMJQXV0aDAgTExDMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDAeFw0xMjEyMjkxNTMwNDdaFw0xMzAxMjgxNTMwNDdaMGIxGDAWBgNVBAMTD2F1dGgwLmF1dGgwLmNvbTESMBAGA1UEChMJQXV0aDAgTExDMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMZiVmNHiXLldrgbS50ONNOH7pJ2zg6OcSMkYZGDZJbOZ/TqwauC6JOnI7+xtkPJsQHZSFJs4U0srjZKzDCmaz2jLAJDShP2jaXlrki16nDLPE//IGAg3BJguSmBCWpDbSm92V9hSsE+Mhx6bDaJiw8yQ+Q8iSm0aTQZtp6O4ICMu00ESdh9NJqIECELvP31ADV1Xhj7IbyyVPDFxMv3ol5BySE9wwwOFUq/wv7Xz9LRiUjUzPO+Lq3OM3o/uCDbk7jD7XrGUuOydALD8ULsXp4EuDO+nFbeXB/iKndZynuVKokirywl2nD2IP0/yncdLQZ8ByIyqP3G82fq/l8p7AsCAwEAAaOBxzCBxDAdBgNVHQ4EFgQUHI2rUXeBjTv1zAllaPGrHFcEK0YwgZQGA1UdIwSBjDCBiYAUHI2rUXeBjTv1zAllaPGrHFcEK0ahZqRkMGIxGDAWBgNVBAMTD2F1dGgwLmF1dGgwLmNvbTESMBAGA1UEChMJQXV0aDAgTExDMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZIIJALr9HwgrQ7GeMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADggEBAFrXIhCy4T4eGrikb0R2wHv/uS548r3pZyBV0CDbcRwAtbnpJMvkGFqKVp4pmyoIDSVNK/j+sLEshB20XftezHZyRJbCUbtKvXQ6FsxoeZMlN0ITYKTaoBZKhUxxj90otAhNC58qwGUPqt2LewJhHyLucKkGJ1mQ3b5xKZ532ToufouH9VLhig3H1KnxWo/zMD6Ke8cCk6qO9htuhI06s3GQGS1QWQtAmm17C6TfKgDwQFZwhqHUUZnwKRH8gU6OgZsvhgV1B7H5mjZcu57KMiDBekU9MEY0DCVTN3WkmcTII668zLsJrkNX6PEfck1AMBbVE6pEUKcWwq3uaLvlAUo=",
  "CipherData": {
    "CipherValue": "Ad/F7DvLVc0NwmI7kS3JvMJE0Qh1Jf452hoe1FXVghjRimy7HcDjpZurM9+JSxlqSE0kY98xuqudosgXABdqDYz4NPqRXEsUVclx0JItyB/Jv7/qgHSG/hCh9cyZkf0yhpfbugiHLDvPhHLjCB/dUXoYEETHMWQ0mXbJGG3zyIJwm3rRbmmrWanitejs30oNxb0R3X5Ao5aOZFHZ/prw+6Ant7eFsdWhKpqMx8mCSXlQwMZqdkdi6GHVCKSRnFY9EaU3PIsWUM7s8+wc2d2xxxavnailwQmpA0Gdg4hUDiNkIgpPxzWWZQ7y0ogWiHDSJcsd1N9hq0bb2VrjXcTZxQ=="
  }
},
		"CipherData": {
			"CipherValue": "g5HaGPWeQZYwQmtq6Ak979S+CgSCfkOGgcps79GBZocGbEOb4qYHVr5/pUQgjwVd"
		}
	}
}
~~~

Example 2: Encrypt the second book (Sword of Honour) of the object "obj".

~~~js

var options = {
      rsa_pub: fs.readFileSync(__dirname + '/test-auth0_rsa.pub'),
      pem: fs.readFileSync(__dirname + '/test-auth0.pem'),
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
               "EncryptionMethod":"http://www.w3.org/2001/04/xmlenc#aes128-cbc",
               "KeyInfo":{
                  "EncryptedMethod":{
                     "Algorithm":"http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"
                  },
                  "KeyInfo":"MIIEDzCCAvegAwIBAgIJALr9HwgrQ7GeMA0GCSqGSIb3DQEBBQUAMGIxGDAWBgNVBAMTD2F1dGgwLmF1dGgwLmNvbTESMBAGA1UEChMJQXV0aDAgTExDMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDAeFw0xMjEyMjkxNTMwNDdaFw0xMzAxMjgxNTMwNDdaMGIxGDAWBgNVBAMTD2F1dGgwLmF1dGgwLmNvbTESMBAGA1UEChMJQXV0aDAgTExDMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMZiVmNHiXLldrgbS50ONNOH7pJ2zg6OcSMkYZGDZJbOZ/TqwauC6JOnI7+xtkPJsQHZSFJs4U0srjZKzDCmaz2jLAJDShP2jaXlrki16nDLPE//IGAg3BJguSmBCWpDbSm92V9hSsE+Mhx6bDaJiw8yQ+Q8iSm0aTQZtp6O4ICMu00ESdh9NJqIECELvP31ADV1Xhj7IbyyVPDFxMv3ol5BySE9wwwOFUq/wv7Xz9LRiUjUzPO+Lq3OM3o/uCDbk7jD7XrGUuOydALD8ULsXp4EuDO+nFbeXB/iKndZynuVKokirywl2nD2IP0/yncdLQZ8ByIyqP3G82fq/l8p7AsCAwEAAaOBxzCBxDAdBgNVHQ4EFgQUHI2rUXeBjTv1zAllaPGrHFcEK0YwgZQGA1UdIwSBjDCBiYAUHI2rUXeBjTv1zAllaPGrHFcEK0ahZqRkMGIxGDAWBgNVBAMTD2F1dGgwLmF1dGgwLmNvbTESMBAGA1UEChMJQXV0aDAgTExDMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZIIJALr9HwgrQ7GeMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADggEBAFrXIhCy4T4eGrikb0R2wHv/uS548r3pZyBV0CDbcRwAtbnpJMvkGFqKVp4pmyoIDSVNK/j+sLEshB20XftezHZyRJbCUbtKvXQ6FsxoeZMlN0ITYKTaoBZKhUxxj90otAhNC58qwGUPqt2LewJhHyLucKkGJ1mQ3b5xKZ532ToufouH9VLhig3H1KnxWo/zMD6Ke8cCk6qO9htuhI06s3GQGS1QWQtAmm17C6TfKgDwQFZwhqHUUZnwKRH8gU6OgZsvhgV1B7H5mjZcu57KMiDBekU9MEY0DCVTN3WkmcTII668zLsJrkNX6PEfck1AMBbVE6pEUKcWwq3uaLvlAUo=",
                  "CipherData":{
                     "CipherValue":"nBZdvu0Go+Qpataf0XqhKQO30RZfe4Q2BnJbmIG0xMSjQhZAQ51EOC3VGyVMOytNrtTJSVj0ipOX6NsJUrXHDGR6XD1xRZXOM4+Bacx4j7D+dluW60vz1kwk2ZdHFdbYc4tp5cAq1karip80G+slkndsK3+xo+Uh92ZFoVbNW1KnGjg3EwTQYsE+R/aXh7hFUr8e2vuvSubIk5fT50YlDpXtsfNPCOWDpnAWaOM7upBDoAnYdwiD1XYyi1ficfkxgnZ3QPp3i4BRspCHtxdoBS25zEI3E+PA1BsCGc31DX/IxJfYqlelDQdqdYhLACltBrLhoCJR5NVxOdgdJcGClg=="
                  }
               },
               "CipherData":{
                  "CipherValue":"1GV6RbZcWRAeoDTCZLpwhxP5RxFP+dtPxpZpjrhsYpEXo3BK4l+wWL7SvSkqpxhd/023ESd68XUoftFRnMP48B77lXRhghA9vFFd3pyUm6MwTFY62nYCOzh0SHvNBGKk/IjcyW6sGKAC8IqMsBBesw=="
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


### decrypt

To decrypt the previous examples:

Example 1:

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

Example 2:

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
  * http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p
  * http://www.w3.org/2001/04/xmlenc#rsa-1_5

* EncryptedData using:  
  * http://www.w3.org/2001/04/xmlenc#aes128-cbc
  * http://www.w3.org/2001/04/xmlenc#aes256-cbc
  * http://www.w3.org/2001/04/xmlenc#tripledes-cbc

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
[coveralls-image]: https://coveralls.io/repos/tiagomistral/SecJSON/badge.svg
[coveralls-url]: https://coveralls.io/r/tiagomistral/SecJSON
[license-image]: http://img.shields.io/npm/l/secjson.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/secjson.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/secjson
[david-image]: http://img.shields.io/david/tiagomistral/secjson.svg?style=flat-square
[david-url]: https://david-dm.org/tiagomistral/secjson
