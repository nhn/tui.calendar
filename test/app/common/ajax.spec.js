var AJAX = require('common/ajax');

describe('API', function() {
    var ajax;

    function stringify(obj) {
        return JSON.stringify(obj);
    }

    beforeEach(function() {
        ajax = new AJAX();
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    describe('_processRawData()', function() {
        var origin,
            mock;

        beforeEach(function() {
            origin = {a: '123', name: 'cony'};
            mock = stringify(origin);
        });

        it('type 파라미터가 json이면 결과를 파싱하여 객체로 반환한다.', function() {
            var processed = ajax._processRawData('json', mock);
            expect(processed).toEqual(origin);
        });

        it('json이외의 타입은 그냥 반환한다', function() {
            var processed = ajax._processRawData('text/html', mock);
            expect(processed).toBe(stringify(origin));
        });
    });

    describe('_onReadyStateChange()', function() {
        var spies,
            mockOption,
            mockXHR;

        beforeEach(function() {
            spies = jasmine.createSpyObj('handler', ['success', 'fail', 'error', 'complete']);
            mockOption = {
                dataType: 'json',
                success: spies.success,
                fail: spies.fail,
                error: spies.error,
                complete: spies.complete
            };
        });

        it('응답코드에 따라 success또는 fail콜백을 호출한다', function() {
            mockXHR = {
                status: 200,
                readyState: 4,
                responseText: '{"header":{"isSuccessful":true}}'
            };

            ajax._onReadyStateChange(mockOption, mockXHR);
            expect(spies.success).toHaveBeenCalled();

            mockXHR = {
                status: 200,
                readyState: 4,
                responseText: '{"header":{"isSuccessful":false}}'
            };

            ajax._onReadyStateChange(mockOption, mockXHR);
            expect(spies.fail).toHaveBeenCalled();
        });

        it('응답에 문제가 있는 경우 error를 호출한다', function() {
            mockXHR = {
                status: 500,
                readyState: 4,
                responseText: null
            };

            ajax._onReadyStateChange(mockOption, mockXHR);
            expect(spies.success).not.toHaveBeenCalled();
            expect(spies.error).toHaveBeenCalled();

            spies.success.calls.reset();
            spies.error.calls.reset();

            // header 가 없는경우
            mockXHR = {
                status: 500,
                readyState: 4,
                responseText: '{"result":{"test":"123"}}'
            };

            ajax._onReadyStateChange(mockOption, mockXHR);
            expect(spies.success).not.toHaveBeenCalled();
            expect(spies.error).toHaveBeenCalled();
        });

        it('success, fail, error여부와 별개로 맨 마지막에 complete를 호출한다', function() {
            mockXHR = {
                status: 200,
                readyState: 4,
                responseText: '{"header":{"isSuccessful":false}}'
            };

            ajax._onReadyStateChange(mockOption, mockXHR);
            expect(spies.complete).toHaveBeenCalled();
        });
    });

    describe('ajax()', function() {
        var doneFn,
            req;

        beforeEach(function() {
            doneFn = jasmine.createSpy('success');
        });

        it('can ignore server cache to use \'cache\' options.', function() {
            ajax.ajax('/ajax.test', {
                cache: false
            });

            var url1 = jasmine.Ajax.requests.mostRecent().url;

            ajax.ajax('/ajax.test', {
                cache: true
            });

            var url2 = jasmine.Ajax.requests.mostRecent().url;

            expect(url1).not.toBe(url2);
        });

        it('timestamp to disable cache attach safely to url', function() {
            ajax.ajax('/ajax.test?myname=hong', {
                cache: false
            });

            var url = jasmine.Ajax.requests.mostRecent().url;

            expect(url).toMatch(/\/ajax\.test\?myname\=hong&_=\d+/)
        });

        it('ajax 요청을 보낸다', function() {
            ajax.ajax('/ajax.test', {
                success: doneFn
            });

            req = jasmine.Ajax.requests.mostRecent();

            expect(req.url).toBe('/ajax.test');
        });

        it('응답 결과를 콜백에서 받을 수 있다', function() {
            var testResponse = {
                header: {
                    isSuccessful: true
                },
                result: {
                    name: 'cony',
                    age: 12
                }
            };

            ajax.ajax('/ajax.test', {
                success: doneFn
            });

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200,
                readyState: 4,
                responseText: stringify(testResponse)
            });

            expect(doneFn).toHaveBeenCalledWith(testResponse);
        });

        it('POST인 경우 데이터를 보낼 수 있다.', function() {
            ajax.ajax('/ajax.test', {
                method: 'POST',
                data: 'good',
                success: doneFn
            });

            expect(jasmine.Ajax.requests.mostRecent().params).toBe('good');
        });

        it('http method를 설정할 수 있다', function() {
            ajax.ajax('/ajax.test', {
                method: 'GET',
                success: doneFn
            });

            req = jasmine.Ajax.requests.mostRecent();
            expect(req.method).toBe('GET');

            ajax.ajax('/ajax.test', {
                method: 'DELETE'
            });

            req = jasmine.Ajax.requests.mostRecent();
            expect(req.method).toBe('DELETE');
        });

        it('type, contentType 을 설정할 수 있다', function() {
            ajax.ajax('/ajax.test', {
                type: 'text',
                contentType: 'text/html'
            });

            req = jasmine.Ajax.requests.mostRecent();

            expect(req.requestHeaders['type']).toBe('text');
            expect(req.requestHeaders['content-type']).toBe('text/html');
        });

        it('error옵션으로 ajax요청에 문제가 발생했을 때 콜백을 수행할 수 있다', function() {
            var successFn = jasmine.createSpy('success'),
                errFn = jasmine.createSpy('error');

            ajax.ajax('/ajax.test', {
                success: successFn,
                error: errFn
            });

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 500
            });

            expect(successFn).not.toHaveBeenCalled();
            expect(errFn).toHaveBeenCalled();

        });

        it('complete콜백은 성공/실패 유무와 상관없이 수행된다', function() {
            var spy = jasmine.createSpyObj('callback', ['success', 'error', 'complete']);

            ajax.ajax('/ajax.test', {
                success: spy.success,
                error: spy.error,
                complete: spy.complete
            });

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 500
            });

            expect(spy.complete).toHaveBeenCalled();
        });
    });
});
