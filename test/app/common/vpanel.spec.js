'use strict';

var domutil = require('common/domutil');
var VPanel = require('common/vpanel');

describe('VPanel', function() {
    var inst, container;

    beforeEach(function() {
        container = document.createElement('div');
        inst = new VPanel(null, container);
    });

    it('getResizeInfoByGrowth() calculate new height and remain height by supplied growth value.', function() {
        var actual;
        spyOn(inst, 'getHeight').and.returnValue(100);

        actual = inst.getResizeInfoByGrowth(+20);

        expect(actual).toEqual([120, -20]);

        actual = inst.getResizeInfoByGrowth(-20);

        expect(actual).toEqual([80, 20]);
    });

    it('_initPanel() initialize panel container by supplied options.', function() {
        spyOn(domutil, 'addClass');
        spyOn(domutil, 'setData');

        inst._initPanel({
            className: 'good'
        }, container);

        expect(domutil.addClass).toHaveBeenCalledWith(container, 'good');

        domutil.addClass.calls.reset();

        inst._initPanel({
            isSplitter: true
        }, container);

        expect(domutil.addClass.calls.argsFor(0)[1]).toContain('splitter');

        inst._initPanel({
            autoHeight: true
        }, container);

        expect(domutil.setData).toHaveBeenCalledWith(container, 'autoHeight', true);
    });

    it('setHeight() can set specified height after force resizing if options.autoHeight is true', function() {
        inst.options.autoHeight = true;
        inst.isHeightForcedSet = true;

        inst.setHeight(null, 350);

        expect(container.style.height).toBe('350px');
    });
});
