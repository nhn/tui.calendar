var VLayout = ne.dooray.calendar.VLayout;
describe('VLayout', function() {
    it('_extendIndexUntilNoSplitter() extend index until find next normal panel', function() {
        var mockInst = {
            _panels: [{
                isSplitter: function() {return false;}
            }, {
                isSplitter: function() {return true;}
            }, {
                isSplitter: function() {return false;}
            }]
        };

        var actual = VLayout.prototype._extendIndexUntilNoSplitter.call(mockInst, 2, false);
        expect(actual).toBe(2);

        actual = VLayout.prototype._extendIndexUntilNoSplitter.call(mockInst, 1, false);
        expect(actual).toBe(0);

        actual = VLayout.prototype._extendIndexUntilNoSplitter.call(mockInst, 0, false);
        expect(actual).toBe(0);

        actual = VLayout.prototype._extendIndexUntilNoSplitter.call(mockInst, 0, true);
        expect(actual).toBe(0);

        actual = VLayout.prototype._extendIndexUntilNoSplitter.call(mockInst, 20, true);
        expect(actual).toBe(20);
    });

    it('_indexOf() find index of panel by panel container', function() {

    });
});
