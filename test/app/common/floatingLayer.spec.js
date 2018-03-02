'use strict';

var FloatingLayer = require('common/floatingLayer');

describe('FloatingLayer', function() {
    var container;

    beforeEach(function() {
        container = document.createElement('div');
    });

    it('should remove cache property when no layer after destroying layer.', function() {
        var f1 = new FloatingLayer({}, container),
            f2 = new FloatingLayer({}, container);

        f1.destroy();

        expect(container[FloatingLayer.PROP_KEY].length).toBe(1);

        f2.destroy();

        expect(container[FloatingLayer.PROP_KEY]).toBeUndefined();
    });
});
