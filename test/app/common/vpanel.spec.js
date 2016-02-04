describe('VPanel', function() {
    var VPanel = ne.dooray.calendar.VPanel,
        inst, container;

    beforeEach(function() {
        container = document.createElement('div');
        inst = new VPanel(null, container);
    });

    it('getResizeInfoByGrowth() calculate new height and remain height by supplied growth value.', function() {
        spyOn(inst, 'getHeight').and.returnValue(100);

        var actual = inst.getResizeInfoByGrowth(+20);
        expect(actual).toEqual([120, -20]);

        actual = inst.getResizeInfoByGrowth(-20);
        expect(actual).toEqual([80, 20]);
    });

    it('_initPanel() initialize panel container by supplied options.', function() {
        var du = ne.dooray.calendar.domutil;
        spyOn(du, 'addClass');
        spyOn(du, 'setData');

        inst._initPanel({
            className: 'good'
        }, container);

        expect(du.addClass).toHaveBeenCalledWith(container, 'good');

        du.addClass.calls.reset();
        
        inst._initPanel({
            isSplitter: true
        }, container);

        expect(du.addClass.calls.argsFor(0)[1]).toContain('splitter');

        inst._initPanel({
            autoHeight: true
        }, container);

        expect(du.setData).toHaveBeenCalledWith(container, 'autoHeight', true);
    });
});
