/* eslint-disable vars-on-top */
'use strict';

require('@formatjs/intl-datetimeformat/polyfill');
require('@formatjs/intl-datetimeformat/add-all-tz');
var util = require('tui-code-snippet');
var intlUtil = require('common/intlUtil');

describe('common/intlUtil', function() {
    it('supportIntl()', function() {
        var supported = !util.browser.msie;

        expect(intlUtil.supportIntl('Asia/Seoul')).toBe(supported);
    });

    it('offsetCalculator()', function() {
        var d1 = new Date(2020, 10, 22, 0, 0, 0);
        var d2 = new Date(2020, 5, 22, 0, 0, 0);

        if (intlUtil.supportIntl('Asia/Seoul')) {
            expect(intlUtil.offsetCalculator('Asia/Seoul', d1.getTime())).toBe(-540);
        }

        if (intlUtil.supportIntl('America/New_York')) {
            expect(intlUtil.offsetCalculator('America/New_York', d1.getTime())).toBe(300);
            expect(intlUtil.offsetCalculator('America/New_York', d2.getTime())).toBe(240);
        }
    });
});
