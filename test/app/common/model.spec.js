/*eslint-disable*/
var model = require('common/model');
var TZDate = require('common/timezone').Date;

describe('model/model', function() {
    var myObj;

    beforeEach(function() {
        myObj = {};
    });

    describe('validators', function() {
        describe('require()', function() {
            it('return false when supplied property is undefined.', function() {
                expect(model.validators.required(myObj, ['good'])).toBe(false);
            });

            it('return false when supplied property is empty string', function() {
                myObj.title = '';
                expect(model.validators.required(myObj, ['title'])).toBe(false);
                myObj.title = 'title';
                expect(model.validators.required(myObj, ['title'])).toBe(true);
            });

            it('return true when supplied property are wrong', function() {
                expect(model.validators.required(null, [])).toBe(true);
            });
        });

        describe('dateRange()', function() {
            it('return true when supplied property are wrong', function() {
                expect(model.validators.dateRange(null, ['', ''])).toBe(true);
                expect(model.validators.dateRange({}, [])).toBe(true);
            });

            it('return false then one of date is not valid date object.', function() {
                // this will valid (null will convert to 1970-01-01 00:00:00)
                myObj = {
                    start: null,
                    end: new TZDate('2015-05-01')
                };

                expect(model.validators.dateRange(myObj, ['start', 'end'])).toBe(true);

                myObj = {
                    start: 'wer',
                    end: null
                };

                expect(model.validators.dateRange(myObj, ['start', 'end'])).toBe(false);
            });

            it('return true only start and end range are valid.', function() {
                myObj = {
                    start: new TZDate('2015-05-03'),
                    end: new TZDate('2015-05-02')
                };

                expect(model.validators.dateRange(myObj, ['start', 'end'])).toBe(false);
            });
        });
    });

    describe('isValid()', function() {
        beforeEach(function() {
            myObj.constructor = {
                schema: {
                    required: ['title']
                }
            };
        });

        it('return true when schema is empty', function() {
            expect(model.isValid.apply({})).toBe(true);
        });

        it('invoke each validator on a basis of constructor\'s schema property.', function() {
            spyOn(model.validators, 'required');

            myObj.title = 'name';

            model.isValid.apply(myObj);

            expect(model.validators.required).toHaveBeenCalledWith(myObj, ['title']);
        });

        it('skip validate when descibed validator on schema is not exist.', function() {
            delete myObj.constructor.schema.required;
            myObj.constructor.schema.notexist = ['good'];

            expect(model.isValid.apply(myObj)).toBe(true);
        });
    });

    describe('parameterize()', function() {
        beforeEach(function() {
            myObj = {
                name: 'john',
                age: 21,
                hasJob: false,
                brothers: ['mayer'],
                collection: {
                    'numberone': 'book'
                },
                talk: function() {}
            };
        });

        it('make data object for communicate with server or etc.', function() {
            var param = model.parameterize.apply(myObj);

            expect(param).toEqual({
                name: 'john',
                age: 21,
                hasJob: false,
                brothers: ['mayer'],
                collection: {
                    'numberone': 'book'
                }
            });

            expect(param.talk).not.toBeDefined();
        });

        it('not deep copy for object types.', function() {
            var param = model.parameterize.apply(myObj);

            myObj.brothers.push('mike');

            expect(param).toEqual({
                name: 'john',
                age: 21,
                hasJob: false,
                brothers: ['mayer', 'mike'],
                collection: {
                    'numberone': 'book'
                }
            });
            expect(param.brothers.length).toBe(2);
        });
    });
});

