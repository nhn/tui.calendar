/*eslint-disable*/
require('view/template/helper');
fixture.setBase('test/fixtures');
var testsContext = require.context('.', true, /spec.js$/);
testsContext.keys().forEach(testsContext);
var componentsContext = require.context('../src/js/', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);
