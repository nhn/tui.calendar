var CalendarForm = window.ne.dooray.calendar.service.CalendarForm;
describe('dooray:service/view/CalendarForm', function() {
    beforeEach(function() {
        // 폼 데이터 목
        spyOn(window.ne.dooray.calendar.domutil, 'getFormData');
    });

    describe('getFormData()', function() {
        it('캘린더 생성 폼의 데이터에 맞게 추출한 폼 데이터를 재구성한다.', function() {
            //PART 1
            // 다음과 같은 데이터가 입력되었다고 가정
            window.ne.dooray.calendar.domutil.getFormData.and.returnValue({
                projectCode: '0101',
                projectName: 'hello',
                name: 'hello world!',
                color: '#ffffff',
                colorHex: '',
                type: 'private',
                'userId[]': ['012', '013'],
                'authority[]': ['all', 'read_write']
            });


            var expected = {
                projectCode: '0101',
                projectName: 'hello',
                name: 'hello world!',
                color: '#ffffff',
                colorHex: '',
                type: 'private',
                share: [
                    {id: '012', authority: 'all'},
                    {id: '013', authority: 'read_write'}
                ]
            };

            expect(CalendarForm.prototype.getFormData()).toEqual(expected);

            // PART 2 - 공유사용자 한명만 설정
            window.ne.dooray.calendar.domutil.getFormData.and.returnValue({
                projectCode: '0101',
                projectName: 'hello',
                name: 'hello world!',
                color: '#ffffff',
                colorHex: '',
                type: 'private',
                'userId[]': '012',
                'authority[]': 'all'
            });

            expected = {
                projectCode: '0101',
                projectName: 'hello',
                name: 'hello world!',
                color: '#ffffff',
                colorHex: '',
                type: 'private',
                share: [
                    {id: '012', authority: 'all'}
                ]
            };

            expect(CalendarForm.prototype.getFormData()).toEqual(expected);
        });
    });
});

