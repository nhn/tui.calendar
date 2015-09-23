var serverAPI = window.ne.dooray.calendar.serverAPI;

function stringify(obj) {
    return JSON.stringify(obj);
}

describe('API', function() {
    beforeEach(function() {
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

        it('ajax 데이터를 가공한다', function() {
            var processed = serverAPI._processRawData('json', mock);
            expect(processed).toEqual(origin);
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
                responseText: '{"isSuccessful":true}'
            };

            serverAPI._onReadyStateChange(mockOption, mockXHR);
            expect(spies.success).toHaveBeenCalled();

            mockXHR = {
                status: 200,
                readyState: 4,
                responseText: '{"isSuccessful":false}'
            };

            serverAPI._onReadyStateChange(mockOption, mockXHR);
            expect(spies.fail).toHaveBeenCalled();
        });

        it('응답에 문제가 있는 경우 error를 호출한다', function() {
            mockXHR = {
                status: 500,
                readyState: 4,
                responseText: null
            };

            serverAPI._onReadyStateChange(mockOption, mockXHR);
            expect(spies.success).not.toHaveBeenCalled();
            expect(spies.error).toHaveBeenCalled();
        });

        it('success, fail, error여부와 별개로 맨 마지막에 complete를 호출한다', function() {
            mockXHR = {
                status: 200,
                readyState: 4,
                responseText: '{"isSuccessful":false}'
            };

            serverAPI._onReadyStateChange(mockOption, mockXHR);
            expect(spies.complete).toHaveBeenCalled();
        });
    });

    describe('ajax()', function() {
        var doneFn,
            req;

        beforeEach(function() {
            doneFn = jasmine.createSpy('success');
        });

        it('ajax 요청을 보낸다', function() {
            serverAPI.ajax('/serverAPI.test', {
                success: doneFn
            });

            req = jasmine.Ajax.requests.mostRecent();

            expect(req.url).toBe('/serverAPI.test');
        });

        it('데이터를 주고 받는다', function() {
            var testResponse = {
                isSuccessful: true,
                result: {
                    name: 'cony',
                    age: 12
                }
            };

            serverAPI.ajax('/serverAPI.test', {
                data: {hello:"world"},
                success: doneFn
            });

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200,
                readyState: 4,
                responseText: stringify(testResponse)
            });

            expect(doneFn).toHaveBeenCalledWith(testResponse.result);
        });

        it('http method를 설정할 수 있다', function() {
            serverAPI.ajax('/serverAPI.test', {
                method: 'GET',
                success: doneFn
            });

            req = jasmine.Ajax.requests.mostRecent();
            expect(req.method).toBe('GET');

            serverAPI.ajax('/serverAPI.test', {
                method: 'DELETE'
            });

            req = jasmine.Ajax.requests.mostRecent();
            expect(req.method).toBe('DELETE');
        });

        it('type, contentType 을 설정할 수 있다', function() {
            serverAPI.ajax('/serverAPI.test', {
                type: 'text',
                contentType: 'text/html'
            });

            req = jasmine.Ajax.requests.mostRecent();

            expect(req.requestHeaders['type']).toBe('text');
            expect(req.requestHeaders['Content-Type']).toBe('text/html');
        });

        it('beforeRequest옵션으로 ajax요청 전 특정 동작을 수행할 수 있다', function() {
            var bE = jasmine.createSpy('beforeRequest');

            serverAPI.ajax('/serverAPI.test', {
                beforeRequest: bE
            });

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200
            });
            expect(bE).toHaveBeenCalledWith(null);
        });

        it('error옵션으로 ajax요청에 문제가 발생했을 때 콜백을 수행할 수 있다', function() {
            var successFn = jasmine.createSpy('success'),
                errFn = jasmine.createSpy('error');

            serverAPI.ajax('/serverAPI.test', {
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

            serverAPI.ajax('/serverAPI.test', {
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
