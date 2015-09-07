/*eslint-disable*/
var AlldayCreation = window.ne.dooray.calendar.AlldayCreation;
describe('handler:AlldayCreation', function() {
    var proto;

    beforeEach(function() {
        proto = AlldayCreation.prototype;
    });

    it('checkExpectedCondition() can judge specific event target is suitable for creation handler.', function() {
        var div = document.createElement('div');
        var inst = {
            alldayView: {
                childs: {
                    items: {
                        '40': 'hello world'
                    }
                }
            }
        };

        expect(proto.checkExpectedCondition(div)).toBe(false);

        var container = document.createElement('div');
        container.className = 'schedule-view-allday-monthweek schedule-view-40';

        div.className = 'schedule-view-monthweek-events';
        expect(proto.checkExpectedCondition.call(inst, div)).toBe(false);

        container.appendChild(div);
        expect(proto.checkExpectedCondition.call(inst, div)).toBe('hello world');
    });
});
