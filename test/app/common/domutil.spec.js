/*eslint-disable*/
var domutil = ne.dooray.calendar.domutil;
describe('module:domutil', function() {
    var map, 
        btn;

    beforeEach(function() {
        loadFixtures('domutil.html');

        map = domutil.get('map');
        btn = domutil.get('btn');
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
});
