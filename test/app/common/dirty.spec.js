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

       it('Mixin a module', function() {
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

       it('Nested wrapping is disabled', function() {
           dirty.wrap(obj, 'hello');

           var origin = obj.hello;

           dirty.wrap(obj, 'hello');

           expect(obj.hello === origin).toBe(true);
           expect(obj.hello._wrapped).toBe(true);
       });

       it('Automatically processes dirty flagging after method execution', function() {
           dirty.wrap(obj, 'hello');

           obj.hello();
           expect(obj._dirty).toBe(true);
       });

       it('(Method name: Flags) can be passed over by flags object', function() {
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

       it('Prototype objects wrap normally', function() {
           var animal = new Animal('lion');

           animal.growl();

           expect(animal._dirty).toBe(true);
           expect(animal.hasOwnProperty('_dirty')).toBe(true);
           expect(animal.hasOwnProperty('get')).toBe(false);
           expect(animal.test()).toBe('lion');
       });

       it('Passing arguments to wrapped functions', function() {
           var spy = obj.needArgs = jasmine.createSpy('needArgs');
           dirty.wrap(obj, 'needArgs');
           obj.needArgs('qwe');
           expect(spy.calls.argsFor(0)).toEqual(['qwe']);
       });

       it('Works well with inherited objects', function() {
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

       it('Can also be wrapped in inheritance class', function() {
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

       it('Set values and dirty flags on objects', function() {
           obj.set('hello', 'world');

           expect(obj.hello).toBe('world');
           expect(obj._dirty).toBe(true);
       });

       it('Setting values and dirty flagging on instances', function() {
           var animal = new Animal('penguin');

           animal.set('leg', 2);

           expect(animal.leg).toBe(2);
           expect(animal.hasOwnProperty('leg')).toBe(true);
           expect(animal._dirty).toBe(true);
           expect(Animal.prototype._dirty).toBeUndefined();
           expect(Animal.prototype.leg).toBeUndefined();
       });

       it('Log changes when setting values on objects', function() {
           var myObj = { hello: 'world' };

           dirty.mixin(myObj);

           myObj.set('hello', 'good');
           expect(myObj._changed).toEqual({ hello: true });
       });

       it('Log changes when setting values in an instance', function() {
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
       it('You can check whether this method is dirty after setting the value with set()', function() {
           obj.set('hello', 'world!');
           expect(obj.isDirty()).toBe(true);
       });

       it('wrap() check whether dirty even after calling a method that has been processed', function() {
           var animal = new Animal('bear');
           animal.growl();
           expect(animal.isDirty()).toBe(true);
       });

       it('Returns false if wrap() handles false', function() {
           var animal = new Animal('giraffe');
           animal.growl();
           expect(animal.isDirty()).toBe(true);
           animal.test();
           expect(animal.isDirty()).toBe(false);
       });
    });

    describe('dirty()', function() {
       it('Directly modify object\'s dirty flags', function() {
           obj.dirty(true);
           expect(obj._dirty).toBe(true);
           obj.dirty(false);
           expect(obj._dirty).toBe(false);
           obj.dirty();
           expect(obj._dirty).toBe(true);
       });

       it('_changed attribute is emptied', function() {
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
