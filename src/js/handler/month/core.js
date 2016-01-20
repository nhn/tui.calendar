/**
 * @fileoverview Module for calculate date by month view and mouse event object
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

/**
 * Get base event data calculator
 * @param {Drag} dragHandler - drag handler instance
 * @param {Month} monthView - month view
 * @returns {function} function return event data by mouse event object
 */
function getBaseEventData(dragHandler, monthView) {
    var weeks = monthView.children,
        days = weeks.single().getRenderDateRange();

    return function(mouseEvent) {
        console.log(weeks.length, days.length);



        //TODO: 마우스 이벤트를 받아 월뷰에서 마우스 
        //위치가 어떤 날인지 계산하는 로직 개발
    };
}

module.exports = getBaseEventData;
