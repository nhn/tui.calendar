fixture.setBase('test/fixtures');

const testsContext = require.context('.', true, /spec.tsx?$/);
testsContext.keys().forEach(testsContext);

const componentsContext = require.context('../src/ts/', true, /\.tsx?$/);
componentsContext.keys().forEach(componentsContext);

/** Load timezone-mock module properly with jasmine mocking Date. */
function loadTimezoneMock() {
  jasmine.clock().install();
  // eslint-disable-next-line global-require
  require('timezone-mock');
  jasmine.clock().uninstall();
}

loadTimezoneMock();
