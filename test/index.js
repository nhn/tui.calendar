/*eslint-disable*/

// for IE9, IE10, IE11
require('es6-set/implement');
require('weakmap-polyfill');
require('@formatjs/intl-getcanonicallocales/polyfill');
require('@formatjs/intl-locale/polyfill');
require('@formatjs/intl-pluralrules/polyfill');
require('@formatjs/intl-numberformat/polyfill');
require('@formatjs/intl-numberformat/locale-data/en');
require('@formatjs/intl-datetimeformat/polyfill');
require('@formatjs/intl-datetimeformat/locale-data/en');
require('@formatjs/intl-datetimeformat/add-all-tz');

require('view/template/helper');
fixture.setBase('test/fixtures');
var testsContext = require.context('.', true, /spec.js$/);
testsContext.keys().forEach(testsContext);
var componentsContext = require.context('../src/js/', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);
