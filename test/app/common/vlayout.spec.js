var VLayout = ne.dooray.calendar.VLayout;
xdescribe('VLayout', function() {
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
        expect(actual).toBeUndefined();
    });

    it('_indexOf() find index of panel by panel container', function() {
        var mockInst = {
            _panels: [{
                container: 'A'
            }, {
                container: 'B'
            }, {
                container: 'C'
            }]
        };

        var actual = VLayout.prototype._indexOf.call(mockInst, 'B');
        expect(actual).toBe(1);

        actual = VLayout.prototype._indexOf.call(mockInst, 'D');
        expect(actual).toBe(-1);
    });

    it('_getHeightOfAsideSplitter() get height of upper, below splitter based on supplied index.', function() {
        var mockInst = {
            _panels: [{
                isSplitter: function() {return true;}
            }, {
                isSplitter: function() {return false;}
            }, {
                isSplitter: function() {return true;}
            }, {
                isSplitter: function() {return true;}
            }],
            _indexOf: jasmine.createSpy('_indexOf')
        };

        var mockSplitter = jasmine.createSpyObj('VPanel', ['isSplitter', 'getHeight']);
        mockSplitter.getHeight.and.returnValue(5);

        // 첫 번째 index의 splitter기준으로 위, 아래에 있는 splitter들의 높이 합계를 구함.
        mockInst._indexOf.and.returnValue(0);
        var actual = VLayout.prototype._getHeightOfAsideSplitter.call(mockInst, mockSplitter);
        expect(actual).toEqual([0, 10]);

        // 두 번째 index의 splitter기준으로 위, 아래에 있는 splitter들의 높이 합계를 구함.
        mockInst._indexOf.and.returnValue(1);
        var actual = VLayout.prototype._getHeightOfAsideSplitter.call(mockInst, mockSplitter);
        expect(actual).toEqual([5, 10]);

        // 세 번째 index의 splitter기준으로 위, 아래에 있는 splitter들의 높이 합계를 구함.
        mockInst._indexOf.and.returnValue(2);
        var actual = VLayout.prototype._getHeightOfAsideSplitter.call(mockInst, mockSplitter);
        expect(actual).toEqual([5, 5]);
    });

    it('_getPanelResizeRange() get index of panel that need to resize for after user dragging splitter', function() {
        var mockInst = jasmine.createSpyObj('VLayout', ['_correctBinarySearch', '_extendIndexUntilNoSplitter']);
        var mockSizeMap = [1,2,3];
        spyOn(Math, 'abs').and.returnValue(0);
        mockInst._correctBinarySearch.and.returnValue(0);

        VLayout.prototype._getPanelResizeRange.call(mockInst, mockSizeMap, 1, 3);
        expect(mockInst._extendIndexUntilNoSplitter.calls.count()).toBe(2);

        mockInst._extendIndexUntilNoSplitter.calls.reset();

        var actual = VLayout.prototype._getPanelResizeRange.call(mockInst, mockSizeMap, 3, 1);
        expect(mockInst._extendIndexUntilNoSplitter.calls.count()).toBe(3);
    });
});
