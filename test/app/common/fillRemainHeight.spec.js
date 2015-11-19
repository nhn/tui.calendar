var domutil = ne.dooray.calendar.domutil;
var FillRemainHeight = ne.dooray.calendar.FillRemainHeight;
describe('FillRemainHeight', function() {
    var mockInst;

    beforeEach(function() {
        spyOn(domutil, 'getSize');
        mockInst = {};
    });

    it('refresh() can calculate rest height(px) of container and set to listed elements.', function() {
        // A, B, C 엘리먼트 중 C엘리먼트를 가변높이로 지정한 경우
        mockInst = {
            _container: {
                childNodes: ['A', 'B', 'C']
            },
            _listed: {
                'C': 'myelement' 
            },
            _getOtherElementHeight: jasmine.createSpy('_getOtherElementHeight'),
            _setHeight: jasmine.createSpy('_setHeight')
        };

        mockInst._getOtherElementHeight.and.callFake(function(_, node) {
            // A, B는높이 30씩 가지고 있음
            if (node !== 'C') {
                return 30;
            }

            return 0;
        });

        domutil.getSize.and.callFake(function(el) {
            // 컨테이너 사이즈는 100
            if (el === mockInst._container) {
                return [0, 100];
            }
        });

        FillRemainHeight.prototype.refresh.call(mockInst);

        // X = container(100) - A(30) + B(30)
        expect(mockInst._setHeight).toHaveBeenCalledWith('myelement', 40);
    });
});
