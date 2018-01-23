var Collection = require('common/collection');
var MilestoneClick = require('handler/milestone/click');

describe('week:handler:MilestoneClick', function() {
    var mockInst, mockCollection;

    beforeEach(function() {
        // 컨트롤러에 id '2'인 객체가 있다고 가정
        mockCollection = new Collection();
        mockCollection.add({_id: '2', text: 'hello'});

        mockInst = jasmine.createSpyObj('MilstoneClick', ['checkExpectedCondition', 'fire']);
        mockInst.baseController = {
            schedules: mockCollection
        };
    });

    it('_onClick fire custom event "clickSchedule" when target element is related with one of event instance of base controllers.', function() {
        var vMouseEvent = {originEvent: 'test'};
        // 클릭 대상 엘리먼트가 id '2'인 일정과 관계가 있을 때
        mockInst.checkExpectedCondition.and.returnValue(2);

        // 실행하면
        MilestoneClick.prototype._onClick.call(mockInst, vMouseEvent);

        // 이벤트가 아래처럼 발생한다
        expect(mockInst.fire).toHaveBeenCalledWith('clickSchedule', {
            schedule: {
                _id: '2',
                text: 'hello'
            },
            event: 'test'
        });
    });

    it('MilestoneClick doesn\'t fire custom event "milestone_click" when no target or target is not related with events.', function() {
        // 엘리먼트가 MilestoneClick과 관계가 없다
        mockInst.checkExpectedCondition.and.returnValue(false);

        // 실행하면
        MilestoneClick.prototype._onClick.call(mockInst, {});

        // 무반응
        expect(mockInst.fire).not.toHaveBeenCalled();
    });
});
