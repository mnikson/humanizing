'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18nNodejs = require('i18n-nodejs');

var _i18nNodejs2 = _interopRequireDefault(_i18nNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  'lang': 'sr',
  'langFile': '../../languages/index.json'
}; /**
    * @file Translation
    * @author Nikola Miljkovic <mnikson@gmail.com>
    * @version 1.0
    */

var translate = new _i18nNodejs2.default(config.lang, config.langFile);

exports.default = translate;