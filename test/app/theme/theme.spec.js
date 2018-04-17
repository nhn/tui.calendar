'use strict';

var util = require('tui-code-snippet');
var Theme = require('theme/theme');
var themeStandard = require('theme/standard');

describe('Theme', function() {
    var theme;

    beforeEach(function() {
        theme = new Theme();
    });

    it('get a style by key', function() {
        var value = theme.getStyle('common.border');
        expect(value).toBe('1px solid #e5e5e5');
    });

    it('get a style through property path', function() {
        expect(theme.common.border).toBe('1px solid #e5e5e5');
    });

    it('set a style by key', function() {
        var key = 'common.border';
        var value = '2px dashed #ddd';

        theme.setStyle(key, value);

        expect(theme.common.border).toBe(value);
        expect(theme.getStyle(key)).toBe(value);
    });

    it('set multiple styles with key, value map', function() {
        var map = {
            'common.border': '2px dashed #ddd',
            'month.dayname.paddingLeft': '3px',
            'week.today.color': '#555'
        };
        var result = theme.setStyles(map);

        expect(theme.common.border).toBe('2px dashed #ddd');
        expect(theme.month.dayname.paddingLeft).toBe('3px');
        expect(theme.week.today.color).toBe('#555');
        expect(result.length).toBe(0);
    });

    it('no return a style with wrong key parameter', function() {
        var key = 'wrong.key';
        var value = theme.getStyle(key);

        expect(value).toBeUndefined();
    });

    it('no value through property path', function() {
        expect(util.pick(theme, 'wrong', 'border')).toBeUndefined();
    });

    it('return true to set a style by right key', function() {
        var key = 'common.border';
        var value = '2px dashed #ddd';
        var result = theme.setStyle(key, value);

        expect(result).toBe(true);
    });

    it('return false to set a style by wrong key', function() {
        var key = 'wrong.border';
        var value = '2px dashed #ddd';
        var result = theme.setStyle(key, value);

        expect(result).toBe(false);
    });

    it('return wrong keys array when setting multiple styles including wrong key', function() {
        var styles = {
            'wrong.border': '2px dashed #ddd',
            'common.border': '2px dashed #ddd'
        };
        var result = theme.setStyles(styles);

        expect(result).toEqual(['wrong.border']);
    });

    it('can check all predefined key of the standard theme', function() {
        var keys = util.keys(themeStandard);

        util.forEach(keys, function(key) {
            expect(theme.getStyle(key)).not.toBeUndefined();
        });
    });

    it('can check  all predefined key of the given custom theme', function() {
        var customTheme = fixture.load('theme-dooray.json');
        var keys = util.keys(customTheme);

        theme = new Theme(customTheme);

        util.forEach(keys, function(key) {
            expect(theme.getStyle(key)).not.toBeUndefined();
        });
    });

    it('can clear all styles and set another styles', function() {
        var customTheme = fixture.load('theme-dooray.json');
        var keys = util.keys(themeStandard);
        theme.clear();

        util.forEach(keys, function(key) {
            expect(theme.getStyle(key)).toBeUndefined();
        });

        theme.setStyles(customTheme);

        keys = util.keys(customTheme);
        util.forEach(keys, function(key) {
            expect(theme.getStyle(key)).not.toBeUndefined();
        });
    });
});
