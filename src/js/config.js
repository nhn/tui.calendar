/**
 * @fileoverview Object to save global variables.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var label = {
    DAY_NAME: {
        kor: ['일', '월', '화', '수', '목', '금', '토']
    },
    NEW_EVENT: {
        kor: '새 일정'
    }
}

var config = {
    label: label,
    monthweek: {    // 종일일정
        view: {
            CONTAINER_PADDING_LEFT: 60,    // 이벤트 컨테이너 엘리먼트의 left padding.
            EVENT_TOP_MARGIN: 2,    // 이벤트 블록 상단 여백 높이
            FREE_HEIGHT_TO_CREATION: 8    // 생성 액션을 편하게 하기 위해 하단에 추가하는 여백 높이
        },
        handler: {
            guide: {
                TEXT_FOR_NEW_EVENT: label.NEW_EVENT.kor    // 종일일정 생성 효과 엘리먼트 텍스트
            }
        }
    },
    dayname: {    // dayname
        view: {
            DAY_NAME: {    // Date.day 인덱스에 해당하는 일자 레이블 텍스트
                kor: label.DAY_NAME.kor
            }
        }
    },
    timeGrid: {
        view: {
            TICK_INTERVAL: 1000 * 10,    // hourmarker refresh interval.
            PIXEL_RENDER_ERROR: 0.5,    // browser pixel rendering error value.
            SET_SCROLL_DELAY: global.ne.util.browser.msie ? 100 : 50
        }
    }
}

module.exports = config;

