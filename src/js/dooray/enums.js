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
    MILESTONE: 'milestone',
    TASK: 'task',
    ALLDAY: 'allday',
    TIME: 'time'
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

/**
 * 캘린더 아이템의 타입
 * @readonly
 * @enum {string}
 */
var CALENDAR_ITEM_TYPE = {
    PRIVATE: 'private',    // 개인 캘린더
    SHARED: 'shared'       // 공유 캘린더
};

/**
 * 캘린더에 대한 사용자의 권한
 * @readonly
 * @enum {string}
 */
var CALENDAR_ITEM_PERMISSION = {
    OWNER: 'owner',
    OPAQUE_VIEW: 'opaque_view',
    VIEW: 'view',
    READ_WRITE: 'read_write',
    ALL: 'all'
};

module.exports = {
    model: {
        EVENT_CATEGORY: EVENT_CATEGORY,
        DUE_DATE_CLASS: DUE_DATE_CLASS,
        CALENDAR_ITEM_TYPE: CALENDAR_ITEM_TYPE,
        CALENDAR_ITEM_PERMISSION: CALENDAR_ITEM_PERMISSION
    }
};
