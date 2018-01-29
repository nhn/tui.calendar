/*eslint-disable*/
var util = require('tui-code-snippet');
var dirty = require('common/dirty');

describe('dirty mixin', function() {
    var obj;

    function Animal(name) {
       this.name = name;
    }
    Animal.prototype.growl = jasmine.createSpy('growl');
    Animal.prototype.test = function() {
       return this.name;
    };
    dirty.mixin(Animal.prototype);
    dirty.wrap(Animal.prototype, {
       growl: true,
       test: false
    });

    beforeEach(function() {
       obj = {};
       dirty.mixin(obj);
    });

    describe('mixin()', function() {
       var obj = {};

       beforeEach(function() {
           dirty.mixin(obj);
       });

       it('모듈 믹스인', function() {
           expect(obj.set).toBeDefined();
           expect(obj.isDirty).toBeDefined();

           expect(obj.mixin).toBeUndefined();
           expect(obj.wrap).toBeUndefined();
           expect(obj._encodePropertyName).toBeUndefined();
           expect(obj._hasOwnProp).toBeUndefined();
       });
    });

    describe('wrap()', function() {
       beforeEach(function() {
           obj.hello = jasmine.createSpy('hello');
       });

       it('중첩 래핑 불가', function() {
           dirty.wrap(obj, 'hello');

           var origin = obj.hello;

           dirty.wrap(obj, 'hello');

           expect(obj.hello === origin).toBe(true);
           expect(obj.hello._wrapped).toBe(true);
       });

       it('메서드 수행 후 더티 플래깅을 자동 처리함', function() {
           dirty.wrap(obj, 'hello');

           obj.hello();
           expect(obj._dirty).toBe(true);
       });

       it('메서드명:플래그 객체를 넘겨 래핑 가능', function() {
           obj.render = jasmine.createSpy('render');

           dirty.wrap(obj, {
               'hello': true,
               'render': false
           });

           obj.hello();

           expect(obj._dirty).toBe(true);

           obj.render();

           expect(obj._dirty).toBe(false);
       });

       it('프로토타입 객체도 정상 래핑', function() {
           var animal = new Animal('lion');

           animal.growl();

           expect(animal._dirty).toBe(true);
           expect(animal.hasOwnProperty('_dirty')).toBe(true);
           expect(animal.hasOwnProperty('get')).toBe(false);
           expect(animal.test()).toBe('lion');
       });

       it('래핑한 함수에 인자 전달', function() {
           var spy = obj.needArgs = jasmine.createSpy('needArgs');
           dirty.wrap(obj, 'needArgs');
           obj.needArgs('qwe');
           expect(spy.calls.argsFor(0)).toEqual(['qwe']);
       });

       it('상속받은 객체에도 잘 동작', function() {
           function Bear() {
               Animal.call(this);
               this.name = 'bear';
           }
           util.inherit(Bear, Animal);
           Bear.prototype.run = function() {
               return 'run!';
           };

           var bear = new Bear();

           bear.growl();

           expect(bear.isDirty()).toBe(true);
       });

       it('상속 클래스에서도 래핑 가능', function() {
           function Bear() {
               Animal.call(this);
               this.name = 'bear';
           }
           util.inherit(Bear, Animal);
           Bear.prototype.run = function() {
               return 'run!';
           };

           dirty.wrap(Bear.prototype, 'run', false);

           var bear = new Bear();

           bear.growl();
           bear.run();

           expect(bear.isDirty()).toBe(false);
       });

    });

    describe('set()', function() {
       it('no dirty flagging when change to same value.', function() {
           obj.hello = '123';
           obj.set('hello', '123');

           expect(obj._dirty).toBeUndefined();
       });

       it('객체에 값 설정과 더티 플래깅 가능', function() {
           obj.set('hello', 'world');

           expect(obj.hello).toBe('world');
           expect(obj._dirty).toBe(true);
       });

       it('인스턴스에도 값 설정과 더티 플래깅', function() {
           var animal = new Animal('penguin');

           animal.set('leg', 2);

           expect(animal.leg).toBe(2);
           expect(animal.hasOwnProperty('leg')).toBe(true);
           expect(animal._dirty).toBe(true);
           expect(Animal.prototype._dirty).toBeUndefined();
           expect(Animal.prototype.leg).toBeUndefined();
       });

       it('객체에 값 설정 시 변경사항을 기록함', function() {
           var myObj = { hello: 'world' };

           dirty.mixin(myObj);

           myObj.set('hello', 'good');
           expect(myObj._changed).toEqual({ hello: true });
       });

       it('인스턴스에 값 설정 시 변경사항을 기록함', function() {
           var animal = new Animal('penguin');

           animal.set('leg', 2);

           expect(animal._changed).toEqual({ leg: true });
       });
    });

    describe('isPropChagned()', function() {
       it('check argumented property has been changed.', function() {
           var animal = new Animal('bear');

           animal.set('leg', 4);

           expect(animal.isPropChanged('leg')).toBe(true);
           expect(animal.isPropChanged('name')).toBe(false);

           animal.set('name', 'horse');

           expect(animal.isPropChanged('name')).toBe(true);
       });

       it('no error with no set()', function() {
           var animal = new Animal('bear');

           expect(animal.isPropChanged('leg')).toBe(false);
       });
    });

    describe('isDirty()', function() {
       it('set()으로 값 설정 후 이 메서드로 더티 여부 확인 가능', function() {
           obj.set('hello', 'world!');
           expect(obj.isDirty()).toBe(true);
       });

       it('wrap()처리된 메서드 호출 후에도 더티 여부 확인', function() {
           var animal = new Animal('bear');
           animal.growl();
           expect(animal.isDirty()).toBe(true);
       });

       it('wrap()에서 false처리한 경우 false반환', function() {
           var animal = new Animal('giraffe');
           animal.growl();
           expect(animal.isDirty()).toBe(true);
           animal.test();
           expect(animal.isDirty()).toBe(false);
       });
    });

    describe('dirty()', function() {
       it('객체의 더티 플래그를 직접 수정', function() {
           obj.dirty(true);
           expect(obj._dirty).toBe(true);
           obj.dirty(false);
           expect(obj._dirty).toBe(false);
           obj.dirty();
           expect(obj._dirty).toBe(true);
       });

       it('_changed속성이 비워진다', function() {
           var animal = new Animal('camel');
           animal.set('leg', 4);

           animal.dirty(false);

           expect(animal._changed).toEqual({});
       });
    });

    describe('deleteProp()', function() {
       it('safe delete object property.', function() {
           var animal = new Animal('frog');
           animal.set('leg', 4);
           animal.set('jump', 'long');

           animal.deleteProp('jump');

           expect(animal._changed).toEqual({ leg: true });
           expect(animal.jump).toBeUndefined();
       });

       it('no error with no set()', function() {
           var animal = new Animal('frog');

           expect(function() {
               animal.deleteProp('leg');
           }).not.toThrow();

       });
    });

});
