'use strict';

var sanitizer = require('../../../src/js/common/sanitizer');

describe('common/sanitizer', function() {
    beforeEach(function() {
        sanitizer.addAttributeHooks();
    });

    afterEach(function() {
        sanitizer.removeAttributeHooks();
    });

    it("should leave target='_blank' attribute and add 'rel=noopener'", function() {
        var targetStr = '<a href="https://example.com" target="_blank">A link to open in a new tab</a>';
        var expected = '<a href="https://example.com" target="_blank" rel="noopener">A link to open in a new tab</a>';

        var result = sanitizer.sanitize(targetStr);

        expect(result).toBe(expected);
    });

    it('should preserve other target attribute values', function() {
        var targetStr = '<a href="https://example.com" target="_self"></a>';

        var result = sanitizer.sanitize(targetStr);

        expect(result).toBe(targetStr);
    });

    it('should allow a target attribute for anchor tags only', function() {
        var targetStr = '<form href="https://example.com" target="_blank"></form>';
        var expected = '<form href="https://example.com"></form>';

        var result = sanitizer.sanitize(targetStr);

        expect(result).toBe(expected);
    });
});
