'use strict';

var domutil = require('common/domutil');
var Collection = require('common/collection');
var AlldayClick = require('handler/allday/click');
var config = require('config');

describe('handler:AlldayClick', function() {
    var mockInst, mockCollection;

    beforeEach(function() {
        // 컨트롤러에 id '2'인 객체가 있다고 가정
        mockCollection = new Collection();
        mockCollection.add({
            _id: '2',
            text: 'hello'
        });

        mockInst = jasmine.createSpyObj('AlldayClick', ['checkExpectCondition', 'fire']);
        mockInst.baseController = {
            schedules: mockCollection
        };
        mockInst.checkExpectCondition.and.returnValue(true);
    });

    it('_onClick fire custom event "clickSchedule" when target element is related with one of event instance of base controllers.', function() {
        var vMouseEvent = {originEvent: 'test'};
        // 클릭 대상 엘리먼트가 id '2'인 일정과 관계가 있을 때
        spyOn(domutil, 'getData').and.returnValue('2');
        spyOn(domutil, 'closest').and.callFake(function(target, cssClass) {
            if (cssClass === config.classname('.weekday-schedule')) {
                return true;
            }

            return false;
        });

        // 실행하면
        AlldayClick.prototype._onClick.call(mockInst, vMouseEvent);

        // 이벤트가 아래처럼 발생한다
        expect(mockInst.fire).toHaveBeenCalledWith('clickSchedule', {
            schedule: {
                _id: '2',
                text: 'hello'
            },
            event: 'test'
        });
    });

    it('_onClick fire custom event "clickExpand" when click expand button.', function() {
        var vMouseEvent = {originEvent: 'test'};
        spyOn(domutil, 'closest').and.callFake(function(target, cssClass) {
            if (cssClass === config.classname('.weekday-exceed-in-week')) {
                return true;
            }

            return false;
        });

        // 실행하면
        AlldayClick.prototype._onClick.call(mockInst, vMouseEvent);

        // 이벤트가 아래처럼 발생한다
        expect(mockInst.fire).toHaveBeenCalledWith('clickExpand');
    });

    it('_onClick fire custom event "clickCollapse" when click expand button.', function() {
        var vMouseEvent = {originEvent: 'test'};
        spyOn(domutil, 'closest').and.callFake(function(target, cssClass) {
            if (cssClass === config.classname('.weekday-collapse-btn')) {
                return true;
            }

            return false;
        });

        // 실행하면
        AlldayClick.prototype._onClick.call(mockInst, vMouseEvent);

        // 이벤트가 아래처럼 발생한다
        expect(mockInst.fire).toHaveBeenCalledWith('clickCollapse');
    });

    it('AlldayClick doesn\'t fire custom event "click" when no target or target is not related with events.', function() {
        spyOn(domutil, 'closest').and.returnValue(false);

        // 엘리먼트가 AlldayClick과 관계가 없다
        mockInst.checkExpectCondition.and.returnValue(false);

        // 실행하면
        AlldayClick.prototype._onClick.call(mockInst, {});

        // 무반응
        expect(mockInst.fire).not.toHaveBeenCalled();
    });
});
