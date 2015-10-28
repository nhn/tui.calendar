var TaskClick = window.ne.dooray.calendar.TaskClick;
describe('service:handler:TaskClick', function() {
    var mockInst,
        mockCollection;

    beforeEach(function() {
        // 컨트롤러에 id '2'인 객체가 있다고 가정
        mockCollection = new ne.dooray.calendar.Collection();
        mockCollection.add({_id: '2', text: 'hello'});

        mockInst = jasmine.createSpyObj('MilstoneClick', ['checkExpectedCondition', 'fire']);
        mockInst.baseController = {
            events: mockCollection
        };
    });

    it('_onClick fire custom event "task_click" when target element is related with one of event instance of base controllers.', function() {
        // 클릭 대상 엘리먼트가 id '2'인 일정과 관계가 있을 때
        mockInst.checkExpectedCondition.and.returnValue(2);

        // 실행하면
        TaskClick.prototype._onClick.call(mockInst, {});

        // 이벤트가 아래처럼 발생한다
        expect(mockInst.fire).toHaveBeenCalledWith('task_click', {
            model: {
                _id: '2',
                text: 'hello'
            }
        });
    });

    it('TaskClick doesn\'t fire custom event "task_click" when no target or target is not related with events.', function() {
        // 엘리먼트가 TaskClick과 관계가 없다
        mockInst.checkExpectedCondition.and.returnValue(false);

        // 실행하면
        TaskClick.prototype._onClick.call(mockInst, {});

        // 무반응
        expect(mockInst.fire).not.toHaveBeenCalled();
    });
});
