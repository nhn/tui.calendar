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
        mockInst = jasmine.createSpyObj('FillRemainHeight', ['_getOtherElementHeight', '_setHeight', '_getHeight']);
        mockInst._container = {
            childNodes: ['A', 'B', 'C']
        };
        mockInst._listed = {
            'C': 'myelement'
        };

        mockInst._getOtherElementHeight.and.callFake(function(_, node) {
            // A, B는높이 30씩 가지고 있음
            if (node !== 'C') {
                return 30;
            }

            return 0;
        });
        // 컨테이너 사이즈는 100
        domutil.getSize.and.returnValue([0, 100]);

        FillRemainHeight.prototype.refresh.call(mockInst);

        // X = container(100) - A(30) + B(30)
        expect(mockInst._setHeight).toHaveBeenCalledWith('myelement', 40);
    });
});
