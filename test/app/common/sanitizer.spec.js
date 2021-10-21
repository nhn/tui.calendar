'use strict';

var sanitizer = require('../../../src/js/common/sanitizer');

describe('common/sanitizer', function() {
    beforeEach(function() {
        sanitizer.addAttributeHook();
    });

    afterEach(function() {
        sanitizer.removeAttributeHook();
    });

    it("should leave 'target' attribute and add 'rel=noopener'", function() {
        var targetStr = "<a href='https://example.com' target='_blank'>A link to open in a new tab</a>";
        var expected = '<a href="https://example.com" target="_blank" rel="noopener">A link to open in a new tab</a>';

        var result = sanitizer.sanitize(targetStr);

        expect(result).toBe(expected);
    });
});
