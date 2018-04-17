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

    it('The elements in the document can be easily navigated using id', function() {
        expect(map.id).toEqual('map');
        expect(map.tagName).toEqual('DIV');

        expect(btn.id).toEqual('btn');
        expect(btn.tagName).toEqual('BUTTON');
    });

    it('You can check the style of a specific element', function() {
        var color = domutil.getStyle(map, 'backgroundColor');

        expect(color).toEqual('red');
    });

    it('You can check the class of a specific element.', function() {
        var cls = domutil.getClass(btn);

        expect(cls).toEqual('btn-text');
    });

    it('You can change the class of a specific element.', function() {
        domutil.setClass(btn, 'btn btn-text');

        expect(domutil.getClass(btn)).toEqual('btn btn-text');
    });

    it('You can add classes for specific elements.', function() {
        domutil.addClass(map, 'my-map');
        domutil.addClass(btn, 'btn');

        expect(domutil.getClass(map)).toEqual('my-map');
        expect(domutil.getClass(btn)).toEqual('btn-text btn');

    });

    it('You can remove a class from a specific element', function() {
        domutil.removeClass(btn, 'btn-text');

        expect(btn.className).toEqual('');
    });

    it('You can check if an element has a particular class.', function() {
        expect(domutil.hasClass(btn, 'btn-text')).toBeTruthy();
    });

    it('You can specify the element\'s position through the setPosition method.', function() {
        domutil.setPosition(map, 25, 100);

        expect(map.style.left).toEqual('25px');
        expect(map.style.top).toEqual('100px');

        expect(domutil.getPosition(map)).toEqual([25, 100]);
    });

    it('You can use the getPosition method to calculate the position of an element.', function() {
        var mapPosition = domutil.getPosition(document.getElementById('getPos'));
        expect(mapPosition).toEqual([50, 50]);
    });

    it('The getSize() method accepts the element size as a Rect', function() {
        map.style.width = '200px';
        map.style.height = '100px';

        var size = domutil.getSize(map);

        expect(size).toEqual([200, 100]);
        expect(size).not.toBe([20, 10]);
    });

    describe('closest()', function() {
        it('If the first argument satisfies the condition, it just returns the first argument.', function() {
            var li = document.getElementById('list-item');
            expect(domutil.closest(li, '#list-item')).toBe(li);
        });

        it('Find until the parent element corresponding to selector is found', function() {
            var li = document.getElementById('list-item');
            expect(domutil.closest(li, '#parent')).toBe(document.getElementById('parent'));
        });

        it('Returns null if selector has no parent element', function() {
            var li = document.getElementById('list-item');
            expect(domutil.closest(li, '#notexist')).toBeNull();
        });

        it('Works for non-rendered elements', function() {
            var div = document.createElement('div');
            div.setAttribute('id', 'good');
            div.innerHTML = '<ul><li id="testtest">123</li></ul>';

            var li = domutil.find('li', div);

            expect(domutil.closest(li, '#good')).toBe(div);
        });

        it('Returns if parentNode is null.', function() {
            var div = document.createElement('div');
            expect(domutil.closest(div, '#good')).toBeNull();
        });
    });

    describe('text()', function() {
        it('You can see all the text inside dom without tags', function() {
            var div = domutil.find('#test');

            expect(domutil.text(div)).toBe('goodspan tag');
        });
    });

    describe('find()', function() {
        it('The find() method allows you to navigate the dom in the document with id, className, and tagName', function() {
            var div = domutil.find('#test'),
                span = domutil.find('span', div),
                textarea = domutil.find('.my-textarea', div),
                strong = domutil.find('strong', div);

            expect(span.getAttribute('id')).toBe('myspan');
            expect(textarea).toBeDefined();
            expect(textarea.value).toBe('good');
            expect(strong.innerHTML).toBe('tag');
        });

        it('If there is no second argument, the search starts from document.body', function() {
            var span = domutil.find('#myspan');

            expect(span.getAttribute('id')).toBe('myspan');
        });

        it('You can also use the root element\'s id in the second element', function() {
            var span = domutil.find('span', 'test');

            expect(span.getAttribute('id')).toBe('myspan');
        });

        it('Returns null if element is missing', function() {
            var firstCheckedInput = domutil.find('form', document.getElementById('find-test'));
            expect(firstCheckedInput).toBe(null);
        });

        it('If the third argument is not set, only the first element that satisfies the condition is returned.', function() {
            var firstCheckedInput = domutil.find('input', document.getElementById('find-test'));
            expect(firstCheckedInput).toBe(document.getElementById('find-test-first'));
        });

        it('If you set the third argument to true, it returns all the elements that match the condition.', function() {
            var inputs = domutil.find('input', document.getElementById('find-test'), true);
            expect(inputs.length).toBe(3);
            expect(inputs).toEqual([
                document.getElementById('find-test-first'),
                document.getElementById('find-test-second'),
                document.getElementById('find-test-third')
            ]);
        });

        it('Pass the function to the third argument and use it as a filter.', function() {
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

        it('Create an element and add it directly to the document', function() {
            var div = domutil.appendHTMLElement('div');
            var image = domutil.appendHTMLElement('img');

            div.id = 'freshDiv';

            expect(div.nodeName).toBe('DIV');
            expect(image.nodeName).toBe('IMG');
            expect(document.getElementById('freshDiv')).toBe(div);
        });

        it('You can instantiate an element as a child of a specific element', function() {
            var wrap = domutil.appendHTMLElement('div');

            wrap.id = 'freshWrapDiv';

            var img = domutil.appendHTMLElement('img', wrap);

            expect(document.getElementById('freshWrapDiv').childNodes[0]).toBe(img);
        });

        it('You can assign a cssClass at the same time as creating an element', function() {
            var el = domutil.appendHTMLElement('div', null, 'my-wrap');

            expect(domutil.getClass(el)).toBe('my-wrap');
        });
    });

    describe('getFormData()', function() {
        it('You can assign a cssClass at the same time as creating an element', function() {
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

        it('If there is no option but a selectbox, empty String', function() {
            var actual = domutil.getFormData(document.getElementById('testform1'));
            expect(actual['type3']).toBe('');
        });

        it('Remove elements that are disabled', function() {
            var actual = domutil.getFormData(document.getElementById('testform1'));
            expect(actual['type2']).not.toBeDefined();
            expect(actual['name2']).not.toBeDefined();
        });
    });
});
