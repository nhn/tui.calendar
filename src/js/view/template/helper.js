/**
 * @fileoverview Helpers for handlebar templates.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;

function getElSize(value, postfix, prefix) {
    prefix = prefix || '';
    if (util.isNumber(value)) {
        return prefix + ':' + value + postfix;
    }

    return prefix + ':auto';
}

module.exports = {
    'stamp': function(obj) {
        return util.stamp(obj);
    },

    'equal': function(a, b) {
        return a === b;
    },

    'or': function(a, b) {
        return a || b;
    },

    'fi': function(a, oper, b, options) {
        switch (oper) {
            case '==':
                return (a == b) ? options.fn(this) : options.inverse(this);
            case '===':
                return  (a === b) ? options.fn(this) : options.inverse(this);
            default:
                break;
        }
    },

    'common-width': function(width) {
        return getElSize(width, '%', 'width');
    },

    /**
     * Use in time.hbs
     * @param {EventViewModel} eventViewModel viewModel
     * @returns {string} element size css class
     */
    'time-eventBlock': function(eventViewModel) {
        var top = getElSize(eventViewModel.top, 'px', 'top'),
            left = getElSize(eventViewModel.left, '%', 'left'),
            width = getElSize(eventViewModel.width, '%', 'width'),
            height = getElSize(eventViewModel.height, 'px', 'height');

        return [top, left, width, height].join(';');
    },

    /**
     * Use in dayname.hbs
     * @returns {string} css class
     */
    'dayname-isHolliday': function() {
        if (this.day === 0 || this.day === 6) {
            return 'schedule-view-dayname schedule-holliday';
        }

        return 'schedule-view-dayname';
    },

    'multiply': function(a, b) {
        return a * b;
    },

    /**
     * 셀렉트박스 헬퍼
     * @param {string} name - 셀렉트박스 name 속성값
     * @param {{value: string, label: string}} list - 옵션 리스트
     * @param {string} selectedValue - 기본선택처리 원하는 값
     * @returns {string} html tag
     */
    'selectbox': function(name, list, selectedValue) {
        var html = '<select name="' + name + '">';

        util.forEach(list, function(data) {
            html += '<option value="' + data.value + '"' + (selectedValue === data.value ? ' selected' : '') + '>' + data.label + '</option>';
        });

        return html + '</select>';
    },

    'radioCalendarColor': function(name, list, checkedValue) {
        return util.map(list, function(data) {
            return '<label>' + 
                '<input type="radio" name="' + name + '" value="' + data.value + '"' + 
                (data.value === checkedValue ? ' checked' : '') + ' />' + 
                '<span style="background-color:#' + data.value + '">&nbsp;</span>' +
                '</label>';
        }).join('');
    }
};

