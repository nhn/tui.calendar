/*eslint-disable*/
var model = ne.dooray.calendar.Model;

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

            it('return false when one of supplied property is not Moment object.', function() {
                
                myObj = {
                    starts: moment('2015-05-01'),
                    ends: moment('2015-05-02')
                };

                expect(model.validators.dateRange(myObj, ['starts', 'ends'])).toBe(true);

                myObj.ends = null;

                expect(model.validators.dateRange(myObj, ['starts', 'ends'])).toBe(false);
            });

            it('return true only starts and ends range are valid.', function() {
                myObj = {
                    starts: moment('2015-05-03'),
                    ends: moment('2015-05-02')
                };

                expect(model.validators.dateRange(myObj, ['starts', 'ends'])).toBe(false);
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
});

