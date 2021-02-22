/** Load timezone-mock module properly with jasmine mocking Date. */
export default function loadTimezoneMock() {
  jasmine.clock().install();
  // eslint-disable-next-line global-require
  require('timezone-mock');
  jasmine.clock().uninstall();
}
