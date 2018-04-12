/**
 * @fileoverview The standard theme
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

/**
 * "common" prefix is for entire calendar. "common" properties can be overriden by "week", "month".
 * "week" prefix is for weekly and daily view.
 * "month" prefix is for monthly view.
 */
var theme = {
    'common.border': '1px solid #e5e5e5',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#ff4040',
    'common.saturday.color': '#333',
    'common.dayname.color': '#333',
    'common.today.color': '#333',

    // creation guide style
    'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'common.creationGuide.border': '1px solid #515ce6',

    // month header 'dayname'
    'month.dayname.height': '31px',
    'month.dayname.borderLeft': 'none',
    'month.dayname.paddingLeft': '10px',
    'month.dayname.fontSize': '12px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
    'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
    'month.weekend.backgroundColor': 'none',
    'month.day.fontSize': '14px',

    // month schedule style
    'month.schedule.borderRadius': '2px',
    'month.schedule.height': '24px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '8px',
    'month.schedule.marginRight': '8px',

    // week header 'dayname'
    'week.dayname.height': '42px',
    'week.dayname.borderTop': '1px solid #e5e5e5',
    'week.dayname.borderBottom': '1px solid #e5e5e5',
    'week.dayname.borderLeft': 'none',
    'week.dayname.paddingLeft': '0',
    'week.dayname.backgroundColor': 'inherit',
    'week.dayname.textAlign': 'left',
    'week.today.color': 'inherit',

    // week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #e5e5e5',
    'week.vpanelSplitter.height': '3px',

    // week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #e5e5e5',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.width': '72px',
    'week.daygridLeft.backgroundColor': 'inherit',
    'week.daygridLeft.paddingRight': '8px',
    'week.daygridLeft.borderRight': '1px solid #e5e5e5',

    'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'week.weekend.backgroundColor': 'inherit',

    // week timegrid 'timegrid'
    'week.timegridLeft.width': '72px',
    'week.timegridLeft.paddingRight': '8px',
    'week.timegridLeft.borderRight': '1px solid #e5e5e5',
    'week.timegridLeft.fontSize': '11px',
    'week.timegridLeft.color': '#333',

    'week.timegridOneHour.height': '52px',
    'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

    'week.timegrid.paddingRight': '8px',
    'week.timegrid.borderRight': '1px solid #e5e5e5',

    'week.currentTime.color': '#515ce6',
    'week.currentTime.fontSize': '11px',

    'week.currentTimeLinePast.height': '1px',
    'week.currentTimeLinePast.border': '1px dashed #515ce6',

    'week.currentTimeLineBullet.backgroundColor': '#515ce6',
    'week.currentTimeLineBullet.width': '7px',
    'week.currentTimeLineBullet.height': '7px',

    'week.currentTimeLineToday.height': '1px',
    'week.currentTimeLineToday.border': '1px solid #515ce6',

    // week creation guide style
    'week.creationGuide.color': '#515ce6',
    'week.creationGuide.fontSize': '11px',
    'week.creationGuide.fontWeight': 'bold',

    // week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '2px',
    'week.dayGridSchedule.height': '24px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '8px',
    'week.dayGridSchedule.marginRight': '8px'
};

module.exports = theme;
