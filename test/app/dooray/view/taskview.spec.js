var TaskView = require('dooray/view/taskview');
describe('service:view/TaskView', function() {
    var mockInst;

    beforeEach(function() {
        mockInst = {
            options: {
                lineHeight: 12,
                renderStartDate: '2015-05-01',
                renderEndDate: '2015-05-02'
            }
        };
    });

    describe('_getBaseViewModel()', function() {
        it('일정이 없어도 렌더 일자에 대한 정보는 반환한다.', function() {
            var actual = TaskView.prototype._getBaseViewModel.call(mockInst, {});
            var expected = {
                events: {
                    '2015-05-01': {morning: {length: 0}, lunch: {length: 0}, evening: {length: 0}, isToday: false},
                    '2015-05-02': {morning: {length: 0}, lunch: {length: 0}, evening: {length: 0}, isToday: false}
                },
                width: 50,
                height: 0
            };

            expect(actual).toEqual(expected);
        });

        it('상위 뷰에서 업무일정 정보가 내려오면 템플릿에 맞게 events 프로퍼티에 넣는다.', function() {
            var viewModel = {
                '2015-05-02': {hello: {length: 2}}
            };
            var actual = TaskView.prototype._getBaseViewModel.call(mockInst, viewModel);
            var expected = {
                events: {
                    '2015-05-01': {morning: {length: 0}, lunch: {length: 0}, evening: {length: 0}, isToday: false},
                    '2015-05-02': {hello: {length: 2}, isToday: false}
                },
                width: 50,
                height: 40
            };

            expect(actual).toEqual(expected);

            viewModel = {
                '2015-05-02': {hello: {length: 8}}
            };

            actual = TaskView.prototype._getBaseViewModel.call(mockInst, viewModel);
            expected = {
                events: {
                    '2015-05-01': {
                        morning: {length: 0},
                        lunch: {length: 0},
                        evening: {length: 0},
                        isToday: false
                    },
                    '2015-05-02': {
                        hello: {length: 8},
                        isToday: false
                    }
                },
                width: 50,
                height: 160    // (아이템 수 8 * 12)px
            };

            expect(actual).toEqual(expected);
        });
    });
});
