/* eslint-disable vars-on-top */
'use strict';

var intlUtil = require('common/intlUtil');

describe('common/intlUtil', function() {
    it('supportIntl()', function() {
        expect(intlUtil.supportIntl('Asia/Seoul')).toBe(true);
    });

    it('offsetCalculator()', function() {
        var d1 = new Date(2020, 10, 22, 0, 0, 0);
        var d2 = new Date(2020, 5, 22, 0, 0, 0);

        expect(intlUtil.offsetCalculator('Asia/Seoul', d1.getTime())).toBe(-540);
        expect(intlUtil.offsetCalculator('America/New_York', d1.getTime())).toBe(300);
        expect(intlUtil.offsetCalculator('America/New_York', d2.getTime())).toBe(240);
    });
});
