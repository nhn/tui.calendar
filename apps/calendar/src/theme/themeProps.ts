/**
 * Configuration for theme.
 * "common" prefix is for entire calendar. "common" properties can be overridden by "week", "month".
 * "week" prefix is for weekly and daily view.
 * "month" prefix is for monthly view.
 * @typedef {object} themeProps
 * @example
 // default keys and styles
 const themeProps = {
    'common.border': '1px solid #e5e5e5',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#ff4040',
    'common.saturday.color': '#333',
    'common.dayname.color': '#333',
    'common.today.color': '#333',

    // grid selection style
    'common.gridSelection.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'common.gridSelection.border': '1px solid #515ce6',

    // month grid header 'dayname'
    'month.dayname.borderLeft': 'none',
    'month.dayname.backgroundColor': 'inherit',

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
    'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
    'month.weekend.backgroundColor': 'inherit',

    // month see more events popup
    'month.moreView.border': '1px solid #d5d5d5',
    'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    'month.moreView.backgroundColor': 'white',
    'month.moreViewTitle.backgroundColor': 'inherit',

    // week grid header 'dayname'
    'week.dayname.borderTop': '1px solid #e5e5e5',
    'week.dayname.borderBottom': '1px solid #e5e5e5',
    'week.dayname.borderLeft': 'none',
    'week.dayname.backgroundColor': 'inherit',
    'week.today.color': 'inherit',
    'week.pastDay.color': '#bbb',

    // panel resizer
    'week.panelResizer.border': '1px solid #e5e5e5',

    // week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #e5e5e5',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.backgroundColor': 'inherit',

    'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'week.weekend.backgroundColor': 'inherit',

    // week timegrid 'timegrid'
    'week.timegridLeft.backgroundColor': 'inherit',
    'week.timegridLeft.borderRight': '1px solid #e5e5e5',
    'week.timegridLeftAdditionalTimezone.backgroundColor': 'white',

    'week.timegridHalfHour.borderBottom': 'none',
    'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

    'week.timegrid.borderRight': '1px solid #e5e5e5',

    'week.currentTime.color': '#515ce6',

    'week.pastTime.color': '#bbb',

    'week.futureTime.color': '#333',

    'week.currentTimeLinePast.border': '1px dashed #515ce6',
    'week.currentTimeLineBullet.backgroundColor': '#515ce6',
    'week.currentTimeLineToday.border': '1px solid #515ce6',
    'week.currentTimeLineFuture.border': 'none',

    // week grid selection style
    'week.gridSelection.color': '#515ce6',
};
 */
export const defaultProps = {
  'common.border': '1px solid #e5e5e5',
  'common.backgroundColor': 'white',
  'common.holiday.color': '#ff4040',
  'common.saturday.color': '#333',
  'common.dayname.color': '#333',
  'common.today.color': '#333',

  // grid selection style
  'common.gridSelection.backgroundColor': 'rgba(81, 92, 230, 0.05)',
  'common.gridSelection.border': '1px solid #515ce6',

  // month grid header 'dayname'
  'month.dayname.borderLeft': '1px solid #e5e5e5',
  'month.dayname.backgroundColor': 'inherit',

  // month day grid cell 'day'
  'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
  'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
  'month.weekend.backgroundColor': 'inherit',

  // month see more events popup
  'month.moreView.border': '1px solid #d5d5d5',
  'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
  'month.moreView.backgroundColor': 'white',
  'month.moreViewTitle.backgroundColor': 'inherit',

  // week grid header 'dayname'
  'week.dayname.borderTop': '1px solid #e5e5e5',
  'week.dayname.borderBottom': '1px solid #e5e5e5',
  'week.dayname.borderLeft': 'inherit',
  'week.dayname.backgroundColor': 'inherit',
  'week.today.color': '#333',
  'week.pastDay.color': '#bbb',

  // panel resizer
  'week.panelResizer.border': '1px solid #e5e5e5',

  // week daygrid 'daygrid'
  'week.daygrid.borderRight': '1px solid #e5e5e5',
  'week.daygrid.backgroundColor': 'inherit',

  'week.daygridLeft.backgroundColor': 'inherit',

  'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
  'week.weekend.backgroundColor': 'inherit',

  // week timegrid 'timegrid'
  'week.timegridLeft.backgroundColor': 'inherit',
  'week.timegridLeft.borderRight': '1px solid #e5e5e5',
  'week.timegridLeftAdditionalTimezone.backgroundColor': 'white',

  'week.timegridHalfHour.borderBottom': 'none',
  'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

  'week.timegrid.borderRight': '1px solid #e5e5e5',

  'week.currentTime.color': '#515ce6',

  'week.pastTime.color': '#bbb',

  'week.futureTime.color': '#333',

  'week.currentTimeLinePast.border': '1px dashed #515ce6',
  'week.currentTimeLineBullet.backgroundColor': '#515ce6',
  'week.currentTimeLineToday.border': '1px solid #515ce6',
  'week.currentTimeLineFuture.border': 'none',

  // week grid selection style
  'week.gridSelection.color': '#515ce6',
};

export type ThemePropKeys = keyof typeof defaultProps;
export type ThemeKeyValue = {
  [K in ThemePropKeys]?: string;
};
