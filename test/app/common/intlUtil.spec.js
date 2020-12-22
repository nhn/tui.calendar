/* eslint-disable vars-on-top */
'use strict';

require('es6-set/implement');
require('weakmap-polyfill');
require('@formatjs/intl-getcanonicallocales/polyfill');
require('@formatjs/intl-locale/polyfill');
require('@formatjs/intl-numberformat/polyfill');
require('@formatjs/intl-numberformat/locale-data/en');
require('@formatjs/intl-datetimeformat/polyfill');
require('@formatjs/intl-datetimeformat/locale-data/en');
require('@formatjs/intl-datetimeformat/add-all-tz');

var intlUtil = require('common/intlUtil');

describe('common/intlUtil', function() {
    it('supportIntl()', function() {
        expect(intlUtil.supportIntl('Asia/Seoul')).toBe(true);
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
