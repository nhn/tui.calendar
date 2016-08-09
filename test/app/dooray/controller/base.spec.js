var DoorayController = require('dooray/controller/base');
describe('service:controller/DoorayCalendar', function() {
    var doorayBase,
        jsonFixture;

    beforeEach(function() {
        doorayBase = new DoorayController();
        jsonFixture = fixture.load('dooray/mock_tasks.json');
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('createEvent() can create single DoorayEvent instance from data.', function() {
        doorayBase.createEvent(jsonFixture[0]);
        expect(doorayBase.events.single()).toEqual(jasmine.objectContaining({
            title: '스크럼'
        }));
    });

    it('createEvent() with silent option true then the instance doen\'t fire createdEvent custom event.', function() {
        var spy = jasmine.createSpy('createdEvent');
        doorayBase.on('createdEvent', spy);
        doorayBase.createEvent(jsonFixture[0], true);

        expect(spy).not.toHaveBeenCalled();
    });

    it('createEvents() can create multiple DoorayEvent instance from array data.', function() {
        doorayBase.createEvents(jsonFixture);
        expect(doorayBase.events.length).toBe(4);
    });

    it('createEvents() with silent options then instance doesn\'t fire custom event "createdEvent"', function() {
        var spy = jasmine.createSpy('createdEvent');
        doorayBase.on('createdEvent', spy);
        doorayBase.createEvents(jsonFixture, true);

        expect(spy).not.toHaveBeenCalled();
    });
});
