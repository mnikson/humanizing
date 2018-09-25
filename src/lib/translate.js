/**
 * @file Translation
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */


import i18n from 'i18n-nodejs'

const config = {
  'lang': 'sr',
  'langFile': '../../languages/index.json'
}

const translate = new i18n(config.lang, config.langFile)

export default translate