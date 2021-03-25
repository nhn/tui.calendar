import pick from 'tui-code-snippet/object/pick';
import Theme from '@src/theme';
import preset from '@src/theme/preset';
import { ThemePropKeys } from '@src/theme/themeProps';

const doorayTheme = {
  'common.border': '1px solid #ddd',
  'common.backgroundColor': 'white',
  'common.holiday.color': '#f4436',
  'common.saturday.color': '#333',
  'common.dayname.color': '#333',
  'common.today.color': '#135de6',
  'common.creationGuide.backgroundColor': 'rgba(19, 93, 230, 0.1)',
  'common.creationGuide.border': '1px solid #135de6',
  'month.dayname.height': '42px',
  'month.dayname.borderLeft': '1px solid #ddd',
  'month.dayname.paddingLeft': '8px',
  'month.dayname.fontSize': '13px',
  'month.dayname.backgroundColor': 'inherit',
  'month.dayname.fontWeight': 'normal',
  'month.dayname.textAlign': 'left',
  'month.holidayExceptThisMonth.color': '#f3acac',
  'month.dayExceptThisMonth.color': '#bbb',
  'month.weekend.backgroundColor': '#fafafa',
  'month.day.fontSize': '16px',
  'month.schedule.height': '18px',
  'month.schedule.marginTop': '2px',
  'month.schedule.marginLeft': '10px',
  'month.schedule.marginRight': '10px',
  'week.dayname.height': '41px',
  'week.dayname.borderTop': '1px solid #ddd',
  'week.dayname.borderBottom': '1px solid #ddd',
  'week.dayname.borderLeft': '1px solid #ddd',
  'week.dayname.paddingLeft': '5px',
  'week.dayname.backgroundColor': 'inherit',
  'week.dayname.textAlign': 'left',
  'week.today.color': '#135de6',
  'week.panelResizer.border': '1px solid #ddd',
  'week.panelResizer.height': '3px',
  'week.daygrid.borderRight': '1px solid #ddd',
  'week.daygridLeft.width': '77px',
  'week.daygridLeft.backgroundColor': '#fafafa',
  'week.daygridLeft.paddingRight': '8px',
  'week.daygridLeft.borderRight': '1px solid #ddd',
  'week.today.backgroundColor': 'inherit',
  'week.weekend.backgroundColor': 'inherit',
  'week.timegridLeft.width': '72px',
  'week.timegridLeft.backgroundColor': '#fafafa',
  'week.timegridLeft.borderRight': '1px solid #ddd',
  'week.timegridLeft.fontSize': '12px',
  'week.timegridOneHour.height': '48px',
  'week.timegridHalfHour.height': '24px',
  'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
  'week.timegridHorizontalLine.borderBottom': '1px solid #eee',
  'week.timegrid.paddingRight': '10px',
  'week.timegrid.borderRight': '1px solid #ddd',
  'week.timegridSchedule.borderRadius': '0',
  'week.timegridSchedule.paddingLeft': '0',
  'week.currentTime.color': '#515ce6',
  'week.currentTime.fontSize': '11px',
  'week.currentTime.fontWeight': 'bold',
  'week.currentTimeLinePast.border': '1px solid rgba(19, 93, 230, 0.3)',
  'week.currentTimeLineBullet.backgroundColor': '#135de6',
  'week.currentTimeLineToday.border': '1px solid #135de6',
  'week.currentTimeLineFuture.border': '1px solid #135de6',
  'week.creationGuide.color': '#135de6',
  'week.creationGuide.fontSize': '12px',
  'week.creationGuide.fontWeight': 'bold',
  'week.dayGridSchedule.borderRadius': '0',
  'week.dayGridSchedule.height': '18px',
  'week.dayGridSchedule.marginTop': '2px',
  'week.dayGridSchedule.marginLeft': '10px',
  'week.dayGridSchedule.marginRight': '10px',
};

describe('Theme', function () {
  let theme: Theme;

  beforeEach(function () {
    theme = new Theme();
  });

  it('get a style by key', function () {
    const value = theme.getStyle('common.border');

    expect(value).toBe('1px solid #e5e5e5');
  });

  it('set a style by key', function () {
    const key = 'common.border';
    const value = '2px dashed #ddd';

    theme.setStyle(key, value);

    expect(theme.getStyle(key)).toBe(value);
  });

  it('set multiple styles with key, value map', function () {
    const map = {
      'common.border': '2px dashed #ddd',
      'month.dayname.paddingLeft': '3px',
      'week.today.color': '#555',
    };
    const result = theme.setStyles(map);

    expect(theme.getStyle('common.border')).toBe('2px dashed #ddd');
    expect(theme.getStyle('month.dayname.paddingLeft')).toBe('3px');
    expect(theme.getStyle('week.today.color')).toBe('#555');
    expect(result.length).toBe(0);
  });

  it('no return a style with wrong key parameter', function () {
    const key = 'wrong.key';
    const value = theme.getStyle(key as ThemePropKeys);

    expect(value).toBe('');
  });

  it('no value through property path', function () {
    expect(pick(theme, 'wrong', 'border')).toBeUndefined();
  });

  it('return true to set a style by right key', function () {
    const key = 'common.border';
    const value = '2px dashed #ddd';
    const result = theme.setStyle(key, value);

    expect(result).toBe(true);
  });

  it('return false to set a style by wrong key', function () {
    const key = 'wrong.border';
    const value = '2px dashed #ddd';
    const result = theme.setStyle(key as ThemePropKeys, value);

    expect(result).toBe(false);
  });

  it('return wrong keys array when setting multiple styles including wrong key', function () {
    const styles = {
      'wrong.border': '2px dashed #ddd',
      'common.border': '2px dashed #ddd',
    };
    const result = theme.setStyles(styles);

    expect(result).toEqual(['wrong.border']);
  });

  it('can check all predefined key of the standard theme', function () {
    const keys = Object.keys(preset) as ThemePropKeys[];

    keys.forEach(function (key) {
      expect(theme.getStyle(key)).not.toBe('');
    });
  });

  it('can check  all predefined key of the given custom theme', function () {
    const customTheme = doorayTheme;
    const keys = Object.keys(customTheme) as ThemePropKeys[];

    theme = new Theme(customTheme);

    keys.forEach(function (key) {
      expect(theme.getStyle(key)).not.toBe('');
    });
  });

  it('can clear all styles and set another styles', function () {
    const customTheme = doorayTheme;
    let keys = Object.keys(preset) as ThemePropKeys[];
    theme.clear();

    keys.forEach(function (key) {
      expect(theme.getStyle(key)).toBe('');
    });

    theme.setStyles(customTheme);

    keys = Object.keys(customTheme) as ThemePropKeys[];
    keys.forEach(function (key) {
      expect(theme.getStyle(key)).not.toBe('');
    });
  });
});
