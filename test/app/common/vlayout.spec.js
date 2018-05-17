'use strict';

var util = require('tui-code-snippet');
var VLayout = require('common/vlayout');
var VPanel = require('common/vpanel');

describe('VLayout', function() {
    var inst;

    function getDiv() {
        return document.getElementById('vlayout');
    }

    beforeEach(function() {
        fixture.load('vlayout.html');
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('getLayoutData() return height list for each normal panels with `autoHeight` false', function() {
        inst = new VLayout({
            panels: [
                {
                    minHeight: 50,
                    height: 60
                },
                {isSplitter: true},
                {autoHeight: true}
            ]
        }, getDiv());

        expect(inst.getLayoutData()).toEqual([60]);
    });

    it('setLayoutData()', function() {
        spyOn(VPanel.prototype, 'setHeight');

        inst = new VLayout({
            panels: [
                {
                    minHeight: 50,
                    height: 60
                },
                {isSplitter: true},
                {autoHeight: true}
            ]
        }, getDiv());
        spyOn(inst, 'refresh');

        VPanel.prototype.setHeight.calls.reset();
        inst.setLayoutData([80]);

        expect(VPanel.prototype.setHeight.calls.allArgs()).toEqual([[null, 80]]);
    });

    it('refresh() resize autoHeight true panel\'s container', function() {
        spyOn(VPanel.prototype, 'setHeight');
        spyOn(VPanel.prototype, 'getHeight').and.callFake(function() {
            if (this.options.isSplitter) {
                return 5;
            }

            return this.options.minHeight;
        });

        inst = new VLayout({
            panels: [
                {minHeight: 50},
                {isSplitter: true},
                {autoHeight: true},
                {autoHeight: true}
            ]
        }, getDiv());

        spyOn(inst, 'getViewBound').and.returnValue({height: 500});
        VPanel.prototype.setHeight.calls.reset();

        inst.refresh();

        expect(VPanel.prototype.setHeight.calls.allArgs()).toEqual([
            [null, 222.5],
            [null, 222.5]
        ]);
    });

    it('_getMouseYAdditionalLimit() can calculate additional limit from supplied splitter panel item.', function() {
        var baseSplitterItem,
            actual;

        spyOn(VPanel.prototype, 'getHeight').and.returnValue(5);

        inst = new VLayout({
            panels: [
                {minHeight: 50},
                {isSplitter: true},
                {minHeight: 0},
                {isSplitter: true},
                {minHeight: 20}
            ]
        }, getDiv());

        // The additional drag limits above and below the second splitter base are 50, 25
        baseSplitterItem = inst.panels[1];
        actual = inst._getMouseYAdditionalLimit(baseSplitterItem);

        expect(actual).toEqual([50, 25]);

        // The additional drag limits above and below the fourth splitter base are 55, 20
        baseSplitterItem = inst.panels[3];
        actual = inst._getMouseYAdditionalLimit(baseSplitterItem);

        expect(actual).toEqual([55, 20]);
    });

    describe('_resize', function() {
        var allArgs;

        beforeEach(function() {
            inst = new VLayout({}, getDiv());

            spyOn(VPanel.prototype, 'getHeight').and.callFake(function() {
                // Test ignores splitter size
                if (this.options.isSplitter) {
                    return 0;
                }

                return this.options.height;
            });
        });

        it('resize at 1 splitter between 2 panels.', function() {
            inst.addPanels([
                {height: 100}, // 100,  100
                {isSplitter: true}, //
                {height: 100} // 100,  205
            ], inst.container);
            spyOn(util, 'forEach');
            inst._resize(inst.panels[1], 100, 110);

            // The first panel increased by 10, and the second panel decreased by 10)
            allArgs = util.pluck(util.forEach.calls.argsFor(0)[0], 1);

            expect(allArgs).toEqual([110, 90]);
        });

        it('resize first splitter across to 2 splitter', function() {
            inst.addPanels([
                {height: 100}, // 100,  100
                {isSplitter: true}, //
                {height: 100}, // 100,  200
                {isSplitter: true}, //
                {height: 30} // 30 ,  230
            ], inst.container);
            spyOn(util, 'forEach');

            // Assume you drag the first splitter to the last panel
            inst._resize(inst.panels[1], 100, 210);
            allArgs = util.pluck(util.forEach.calls.argsFor(0)[0], 1);

            expect(allArgs).toEqual([210, 0, 20]);
        });

        it('Assuming you dragged the second splitter up by 30', function() {
            inst.addPanels([
                {height: 100}, // 100,  100
                {isSplitter: true}, //
                {height: 100}, // 100,  200
                {isSplitter: true}, //
                {height: 30} // 30 ,  230
            ], inst.container);
            spyOn(util, 'forEach');

            inst._resize(inst.panels[3], 200, 170);
            allArgs = util.pluck(util.forEach.calls.argsFor(0)[0], 1);

            expect(allArgs).toEqual([60, 70, 100]);
        });
    });
});
