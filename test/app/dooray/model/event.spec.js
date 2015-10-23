var DoorayEvent = window.ne.dooray.calendar.DoorayEvent;
describe('dooray:model/Event', function() {
    var jsonFixtures;

    beforeEach(function() {
        jsonFixtures = getJSONFixture('dooray/mock_tasks.json')[0];
    });

    describe('unmarshal()', function() {
        it('create "general" task instance', function() {
            var task = DoorayEvent.create();

            task.unmarshal(jsonFixtures.general[0]);

            expect(task).toEqual(jasmine.objectContaining({
                __fe_id: jasmine.any(Number),
                title: '출시계획회의',
                isAllDay: false,
                category: 'general',
                dueDateClass: null,
                starts: new Date('2015-09-08T10:30:00+09:00'),
                ends: new Date('2015-09-08T11:30:00+09:00'),
                body: {
                    mimeType: 'text/x-markdown',
                    content: '출시계획을 논의합니다.'
                },
                detailUrl: '/task-tracker/projects/@obiwan/tasks/1234',
                raw: jsonFixtures.general[0]
            }));
        });

        it('create "task" task instance', function() {
            var task = DoorayEvent.create();

            task.unmarshal(jsonFixtures.task[0]);

            expect(task).toEqual(jasmine.objectContaining({
                __fe_id: jasmine.any(Number),
                title: '버그 1',
                isAllDay: false,
                category: 'task',
                dueDateClass: 'morning',
                starts: new Date('2014-11-28T08:30:00+09:00'),
                ends: new Date('2014-11-28T09:00:00+09:00'),
                body: {
                    mimeType: 'text/x-markdown',
                    content: '고쳐주세요'
                },
                detailUrl: '/task-tracker/projects/bug/tasks/4567',
                raw: jsonFixtures.task[0]
            }));
        });

        it('create "milestone" task instance', function() {
            var task = DoorayEvent.create();
            task.unmarshal(jsonFixtures.milestone[0]);

            expect(task).toEqual(jasmine.objectContaining({
                __fe_id: jasmine.any(Number),
                title: '마일스톤 23',
                isAllDay: false,
                category: 'milestone',
                dueDateClass: null,
                starts: new Date('2014-11-28T08:30:00+09:00'),
                ends: new Date('2014-11-28T09:00:00+09:00'),
                body: {
                    mimeType: '',
                    content: ''
                },
                detailUrl: '/task-tracker/projects/bug/milestones/234',
                raw: jsonFixtures.milestone[0]
            }));
        });
    });

    describe('marshal()', function() {
        var task;
        beforeEach(function() {
            task = DoorayEvent.create();
            task.unmarshal(jsonFixtures.general[0]);
        });

        it('create marshal data from model instance.', function() {
            // 장소를 변경했음
            task['location'] = '4-1 회의실';

            // 결과
            expect(task.marshal()).toEqual({
                id: '1',
                calendarId: 1,
                projectId: '456781',
                subject: '출시계획회의',
                wholeDayFlag: false,
                category: 'general',
                dueDate: null,
                dueDateClass: null,
                location: '4-1 회의실',
                createdAt: '2014-10-18T09:30:00+09:00',
                updatedAt: '2014-10-28T09:30:00+09:00',
                startedAt: new Date('2015-09-08T10:30:00+09:00').toISOString(),
                endedAt: new Date('2015-09-08T11:30:00+09:00').toISOString(),
                body: {
                    mimeType: 'text/x-markdown',
                    content: '출시계획을 논의합니다.'
                },
                detailUrl: '/task-tracker/projects/@obiwan/tasks/1234',
                sequence: 1,
                users: {
                    'from': {
                        'memberId': '56789834'
                    },
                    'to': [{
                        'type': 'member',
                        'memberId': '56789876',
                        'status': 'accepted'
                    }],
                    'cc': [{
                        'type': 'member',
                        'memberId': '23456788765'
                    }]
                }
            });
        });
    });
});

