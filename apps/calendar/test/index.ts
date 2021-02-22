import loadTimezoneMock from '@test/util/loadTimezoneMock';

fixture.setBase('test/fixtures');

const testsContext = require.context('.', true, /spec.tsx?$/);
testsContext.keys().forEach(testsContext);

const componentsContext = require.context('../src/', true, /\.tsx?$/);
componentsContext.keys().forEach(componentsContext);

loadTimezoneMock();
