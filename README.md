[![Build Status](https://travis-ci.org/tiagomistral/SecJSON.png)](https://travis-ci.org/tiagomistral/SecJSON)

Secure JSON implementation for node.js

## Usage

    npm install secjson

### encrypt



### decrypt


## Supported algorithms

Currently the library supports:

* EncryptedKey to transport symmetric key using:
  * http://www.w3.org/2001/04/xmlenc#rsa-1_5

* EncryptedData using:
  * http://www.w3.org/2001/04/xmlenc#aes256-cbc

However, you can fork and implement your own algorithm. The code supports adding more algorithms easily

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.
