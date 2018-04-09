/**
 * @fileoverview The all configuration of a theme
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

/**
 * Full configuration for theme.
 * "common" prefix is for entire calendar. "common" properties can be overriden by "week", "month".
 * "week" prefix is for weekly and daily view.
 * "month" prefix is for monthly view.
 */
var themeConfig = {
    'common.border': '1px solid #e5e5e5',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#ff4040',
    'common.dayname.color': '#333',

    // month header 'dayname'
    'month.dayname.height': '31px',
    'month.dayname.borderTop': '1px solid #e5e5e5',
    'month.dayname.borderBottom': '1px solid #e5e5e5',
    'month.dayname.borderLeft': '1px solid #e5e5e5',
    'month.dayname.paddingLeft': '10px',
    'month.dayname.backgroundColor': '',
    'month.dayname.color': '#333',
    'month.dayname.fontSize': '12px',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
    'month.dayExceptThisMonth.color': '#rgba(51, 51, 51, 0.4)',

    'month.day.color': '#333',
    'month.day.fontSize': '14px',
    'month.day.borderTop': '1px solid #e5e5e5',
    'month.day.borderBottom': '1px solid #e5e5e5',
    'month.day.borderLeft': '1px solid #e5e5e5',
    'month.weekend.backgroundColor': '',

    // month creation guide style
    'month.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'month.creationGuide.border': '1px solid #515ce6',

    // month schedule style
    'month.schedule.borderRadius': '2px',
    'month.schedule.height': '24px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '8px',
    'month.schedule.marginRight': '8px',

    // week header 'dayname'
    'week.dayname.height': '40px',
    'week.dayname.borderTop': '1px solid #e5e5e5',
    'week.dayname.borderBottom': '1px solid #e5e5e5',
    'week.dayname.borderLeft': '',
    'week.dayname.paddingLeft': '10px',
    'week.dayname.backgroundColor': '',
    'week.dayname.color': '#333',
    'week.dayname.fontSize': '26px',
    'week.dayname.fontWeight': 'normal',
    'week.dayname.textAlign': 'left',
    'week.todayName.color': '',

    // week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #e5e5e5',
    'week.vpanelSplitter.height': '3px',
    'week.vpanelSplitter.backgroundColor': '',

    // week daygrid 'daygrid'
    'week.daygrid.borderTop': '1px solid #e5e5e5',
    'week.daygrid.borderBottom': '1px solid #e5e5e5',
    'week.daygrid.borderLeft': '1px solid #e5e5e5',
    'week.daygrid.backgroundColor': '',

    'week.daygridLeft.width': '72px',
    'week.daygridLeft.backgroundColor': '',
    'week.daygridLeft.paddingRight': '7px',
    'week.daygridLeft.borderRight': '1px solid #e5e5e5',
    'week.daygridLeft.fontSize': '11px',

    'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'week.weekend.backgroundColor': '',

    // week timegrid 'timegrid'
    'week.timegridLeft.width': '72px',
    'week.timegridLeft.backgroundColor': '',
    'week.timegridLeft.paddingRight': '8px',
    'week.timegridLeft.borderRight': '1px solid #e5e5e5',
    'week.timegridLeft.fontSize': '11px',
    'week.timegridLeft.color': '#333',

    'week.timegridOneHour.height': '52px',
    'week.timegridHalfHour.borderBottom': '',
    'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

    'week.timegrid.paddingRight': '8px',
    'week.timegrid.borderRight': '1px solid #e5e5e5',

    'week.currentTime.color': '#515ce6',
    'week.currentTime.fontSize': '11px',
    'week.currentTime.fontWeight': '',

    'week.currentTimeLinePast.height': '1px',
    'week.currentTimeLinePast.border': '1px dashed #515ce6',

    'week.currentTimeLineBullet.backgroundColor': '#515ce6',
    'week.currentTimeLineBullet.width': '7px',
    'week.currentTimeLineBullet.height': '7px',

    'week.currentTimeLineToday.height': '1px',
    'week.currentTimeLineToday.border': '1px solid #515ce6',

    'week.currentTimeLineFuture.height': '',
    'week.currentTimeLineFuture.border': '',

    // week creation guide style
    'week.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'week.creationGuide.border': '1px solid #515ce6',
    'week.creationGuide.color': '#515ce6',
    'week.creationGuide.fontSize': '11px',
    'week.creationGuide.fontWeight': 'bold',

    // week schedule style
    'week.schedule.borderRadius': '2px'
};

module.exports = themeConfig;
