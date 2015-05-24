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
