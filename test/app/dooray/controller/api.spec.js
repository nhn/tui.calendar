var API = window.ne.dooray.calendar.service.API;
describe('service:controller/API', function() {
    var inst;

    describe('beforeRequest, afterResponse', function() {
        var beforeSpy,
            afterSpy;

        beforeEach(function() {
            beforeSpy = jasmine.createSpy('beforeReq');
            afterSpy = jasmine.createSpy('afterRes');

            inst = new API({
                beforeRequest: beforeSpy,
                afterResponse: afterSpy
            });

            jasmine.Ajax.install();
        });

        afterEach(function() {
            jasmine.Ajax.uninstall();
        });

        it('beforeRequest called before all request sends.', function() {
            inst.getCalendars();

            expect(beforeSpy).toHaveBeenCalled();
            expect(afterSpy).not.toHaveBeenCalled();
        });

        it('afterResponse called after all request is responded.', function() {
            var callbackSpy = jasmine.createSpy('callback');
            inst.getCalendars(null, callbackSpy);

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200,
                responseText: JSON.stringify({
                    header: {
                        isSuccessful: true,
                        returnCode: 0,
                        returnMessage: ''
                    },
                    result: {
                        calendars: []
                    }
                })
            });

            expect(beforeSpy).toHaveBeenCalled();
            expect(afterSpy).toHaveBeenCalled();
            expect(callbackSpy.calls.argsFor(0)[0]).toBe(false);
            expect(callbackSpy.calls.argsFor(0)[1].constructor).toBe(window.ne.dooray.calendar.Collection);
        });
    });

    describe('API', function() {
        beforeEach(function() {
            inst = new API();
            jasmine.Ajax.install();
        });

        afterEach(function() {
            jasmine.Ajax.uninstall();
        });

        it('getCalendars() 는 요청에 해당하는 캘린더 목록을 콜렉션으로 반환한다.', function() {
            inst.getCalendars(null, function(err, res) {
                if (err) {
                    return;
                }

                expect(res.length).toBe(1);
                expect(res.items['115234']).toEqual(jasmine.objectContaining({
                    id: '115234',
                    name: '기본',
                    type: 'private',
                    permission: 'owner',
                    isDefault: true,
                    color: 'ffffff',
                    raw: {
                        id: '115234',
                        name: '기본',
                        type: 'private',
                        permission: 'owner',
                        'default': true,
                        color: 'ffffff',
                        createdAt: '',
                        projectId: '1111',
                        owner: {
                            memberId: '3333'
                        }
                    }
                }));
            });

            // 서버응답
            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200,
                responseText: JSON.stringify({
                    header: {
                        isSuccessful: true,
                        returnCode: 0,
                        returnMessage: ''
                    },
                    result: {
                        calendars: [{
                            "id": "115234",
                            "name": "기본",
                            "type": "private",            // private, shared
                            "createdAt": "",
                            "owner": {
                                "memberId": "3333"
                            },
                            "permission": "owner",        // owner, opaque_view, view, read_write
                            "projectId": "1111",
                            "default": true,             // 개인의 캘린더 중 기본 캘린더
                            "color": "ffffff"
                        }]
                    }
                })
            });
        });
    });
});
