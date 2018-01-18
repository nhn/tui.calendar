/*eslint-disable*/
var domutil = require('common/domutil');

describe('module:domutil', function() {
    var map, btn;

    beforeEach(function() {
        fixture.load('domutil.html');

        map = domutil.get('map');
        btn = domutil.get('btn');
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('can remove element with safely.', function() {
        var vEl = document.createElement('div');

        expect(function() {
            domutil.remove(vEl);
        }).not.toThrow();

        var span = document.getElementById('myspan');

        domutil.remove(span);

        expect(document.getElementById('myspan')).toBe(null);
    });

    it('문서 내 엘리먼트를 id를 이용하여 쉽게 탐색할 수 있다', function() {
        expect(map.id).toEqual('map');
        expect(map.tagName).toEqual('DIV');

        expect(btn.id).toEqual('btn');
        expect(btn.tagName).toEqual('BUTTON');
    });

    it('특정 엘리먼트의 스타일을 확인할 수 있다', function() {
        var color = domutil.getStyle(map, 'backgroundColor');

        expect(color).toEqual('red');
    });

    it('특정 엘리먼트의 class를 확인할 수 있다.', function() {
        var cls = domutil.getClass(btn);

        expect(cls).toEqual('btn-text');
    });

    it('특정 엘리먼트의 class를 변경할 수 있다.', function() {
        domutil.setClass(btn, 'btn btn-text');

        expect(domutil.getClass(btn)).toEqual('btn btn-text');
    });

    it('특정 엘리먼트의 class를 추가할 수 있다.', function() {
        domutil.addClass(map, 'my-map');
        domutil.addClass(btn, 'btn');

        expect(domutil.getClass(map)).toEqual('my-map');
        expect(domutil.getClass(btn)).toEqual('btn-text btn');

    });

    it('특정 엘리먼트의 class를 제거할 수 있다', function() {
        domutil.removeClass(btn, 'btn-text');

        expect(btn.className).toEqual('');
    });

    it('엘리먼트가 특정 클래스를 가지고 있는지 확인할 수 있다.', function() {
        expect(domutil.hasClass(btn, 'btn-text')).toBeTruthy();
    });

    it('setPosition메서드를 통해 엘리먼트의 position을 지정할 수 있다.', function() {
        domutil.setPosition(map, 25, 100);

        expect(map.style.left).toEqual('25px');
        expect(map.style.top).toEqual('100px');

        expect(domutil.getPosition(map)).toEqual([25, 100]);
    });

    it('getPosition메서드를 통해 엘리먼트의 위치를 계산할 수 있다', function() {
        var mapPosition = domutil.getPosition(document.getElementById('getPos'));
        expect(mapPosition).toEqual([50, 50]);
    });

    it('getSize() 메서드로 엘리먼트의 크기를 Rect로 받을 수 있다', function() {
        map.style.width = '200px';
        map.style.height = '100px';

        var size = domutil.getSize(map);

        expect(size).toEqual([200, 100]);
        expect(size).not.toBe([20, 10]);
    });

    describe('closest()', function() {
        it('첫번째 인자가 조건에 만족할때는 첫번째 인자를 그냥 반환함.', function() {
            var li = document.getElementById('list-item');
            expect(domutil.closest(li, '#list-item')).toBe(li);
        });

        it('selector에 해당하는 부모 엘리먼트가 나올때까지 찾는다', function() {
            var li = document.getElementById('list-item');
            expect(domutil.closest(li, '#parent')).toBe(document.getElementById('parent'));
        });

        it('selector에 해당하는 부모 엘리먼트가 없으면 undefined를 반환한다', function() {
            var li = document.getElementById('list-item');
            expect(domutil.closest(li, '#notexist')).toBeUndefined();
        });

        it('렌더링 되지 않은 엘리먼트에 대해서도 동작함', function() {
            var div = document.createElement('div');
            div.setAttribute('id', 'good');
            div.innerHTML = '<ul><li id="testtest">123</li></ul>';

            var li = domutil.find('li', div);

            expect(domutil.closest(li, '#good')).toBe(div);
        });

        it('parentNode가 undefined일 경우 반환함.', function() {
            var div = document.createElement('div');
            expect(domutil.closest(div, '#good')).toBeUndefined();
        });
    });

    describe('text()', function() {
        it('dom내부의 모든 텍스트를 태그 없이 볼 수 있다', function() {
            var div = domutil.find('#test');

            expect(domutil.text(div)).toBe('goodspan tag');
        });
    });

    describe('find()', function() {
        it('find() 메서드로 문서 내 dom을 id, className, tagName으로 탐색할 수 있다', function() {
            var div = domutil.find('#test'),
                span = domutil.find('span', div),
                textarea = domutil.find('.my-textarea', div),
                strong = domutil.find('strong', div);

            expect(span.getAttribute('id')).toBe('myspan');
            expect(textarea).toBeDefined();
            expect(textarea.value).toBe('good');
            expect(strong.innerHTML).toBe('tag');
        });

        it('두 번째 인자가 없으면 document.body부터 찾기 시작한다', function() {
            var span = domutil.find('#myspan');

            expect(span.getAttribute('id')).toBe('myspan');
        });

        it('두 번째 엘리먼트에 root엘리먼트의 id를 넣어도 사용가능하다', function() {
            var span = domutil.find('span', 'test');

            expect(span.getAttribute('id')).toBe('myspan');
        });

        it('엘리먼트가 없을 경우 null 반환', function() {
            var firstCheckedInput = domutil.find('form', document.getElementById('find-test'));
            expect(firstCheckedInput).toBe(null);
        });

        it('세 번째 인자를 설정하지 않으면 조건을 만족하는 첫 번째 엘리먼트만 반환한다.', function() {
            var firstCheckedInput = domutil.find('input', document.getElementById('find-test'));
            expect(firstCheckedInput).toBe(document.getElementById('find-test-first'));
        });

        it('세 번째 인자를 true로 설정하면 조건에 맞는 모든 엘리먼트를 반환한다.', function() {
            var inputs = domutil.find('input', document.getElementById('find-test'), true);
            expect(inputs.length).toBe(3);
            expect(inputs).toEqual([
                document.getElementById('find-test-first'),
                document.getElementById('find-test-second'),
                document.getElementById('find-test-third')
            ]);
        });

        it('세 번째 인자에 함수를 전달하면 필터로 사용한다.', function() {
            var inputs = domutil.find('input', document.getElementById('find-test'), function(el) {
                return el.checked;
            });
            expect(inputs.length).toBe(2);
            expect(inputs).toEqual([
                document.getElementById('find-test-first'),
                document.getElementById('find-test-third')
            ]);
        });
    });

    describe('dataset', function() {
        it('setData()', function() {
            var div = domutil.appendHTMLElement('div');
            domutil.setData(div, 'test', 13);

            expect(div.hasAttribute('data-test')).toBe(true);
        });

        it('getData()', function() {
            var div = domutil.appendHTMLElement('div');
            div.innerHTML = '<div data-test="good"></div>';

            expect(domutil.getData(div.childNodes[0], 'test')).toBe('good');
        });
    });


    describe('createElement()', function() {

        it('엘리먼트를 생성하여 문서에 바로 추가한다', function() {
            var div = domutil.appendHTMLElement('div');
            var image = domutil.appendHTMLElement('img');

            div.id = 'freshDiv';

            expect(div.nodeName).toBe('DIV');
            expect(image.nodeName).toBe('IMG');
            expect(document.getElementById('freshDiv')).toBe(div);
        });

        it('엘리먼트를 특정 엘리먼트의 자식으로 바로 생성할 수 있다', function() {
            var wrap = domutil.appendHTMLElement('div');

            wrap.id = 'freshWrapDiv';

            var img = domutil.appendHTMLElement('img', wrap);

            expect(document.getElementById('freshWrapDiv').childNodes[0]).toBe(img);
        });

        it('엘리먼트 생성과 동시에 cssClass를 할당할 수 있다', function() {
            var el = domutil.appendHTMLElement('div', null, 'my-wrap');

            expect(domutil.getClass(el)).toBe('my-wrap');
        });
    });

    describe('getFormData()', function() {
        it('폼 엘리먼트 내의 입력값을 객체로 출력한다', function() {
            var actual = domutil.getFormData(document.getElementById('testform1'));

            var expected = {
                name: 'test-name',
                tag: ['test2', 'test3'],
                gender: 'female',
                content: 'werwer',
                type: '3',
                type3: ''
            };

            expect(actual).toEqual(expected);
        });

        it('selectbox 이면서 option 이 하나도 없으면 emptyString', function() {
            var actual = domutil.getFormData(document.getElementById('testform1'));
            expect(actual['type3']).toBe('');
        });

        it('disabled인 엘리먼트는 뺌', function() {
            var actual = domutil.getFormData(document.getElementById('testform1'));
            expect(actual['type2']).not.toBeDefined();
            expect(actual['name2']).not.toBeDefined();
        });
    });
});
