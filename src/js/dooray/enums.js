/**
 * @fileoverview Configuration module for dooray project.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

/**
 * 일정 카테고리
 * @readonly
 * @enum {string}
 */
var EVENT_CATEGORY = {
    GENERAL: 'general',
    TASK: 'task',
    MILESTONE: 'milestone'
};

/**
 * 태스크 마감시간 분류
 * @readonly
 * @enum {string}
 */
var DUE_DATE_CLASS = {
    MORNING: 'morning',
    LUNCH: 'lunch',
    EVENING: 'evening'
};


module.exports = {
    model: {
        EVENT_CATEGORY: EVENT_CATEGORY,
        DUE_DATE_CLASS: DUE_DATE_CLASS
    }
};
