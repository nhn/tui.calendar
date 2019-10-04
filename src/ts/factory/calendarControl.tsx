import { h, render, AnyComponent } from 'preact';
import renderToString from 'preact-render-to-string';
import extend from 'tui-code-snippet/object/extend';
import pick from 'tui-code-snippet/object/pick';

import { EventHandler } from '@src/event';
import { ExternalEventName } from '@src/event/externalEventType';
import { InternalEventName } from '@src/event/internalEventType';
import {
  Option,
  AppContext,
  ScheduleData,
  DateType,
  CalendarColor,
  CalendarData
} from '@src/model';
import { contextPass } from '@src/components/hoc';
import Theme from '@src/theme';
import { ThemeKeyValue } from '@src/theme/themeProps';
import { toStartOfDay } from '@src/time/datetime';
import isString from 'tui-code-snippet/type/isString';

export default abstract class CalendarControl extends EventHandler<ExternalEventName> {
  protected _container: Element | null;

  protected _options: Option;

  protected _base?: Element;

  protected _context: AppContext;

  protected _event: EventHandler<InternalEventName>;

  protected _outerEvent: EventHandler<ExternalEventName>;

  protected _viewName = 'month';

  /**
   * Current rendered date
   * @type {TZDate}
   * @private
   */
  protected _renderDate = toStartOfDay();

  /**
   * start and end date of weekly, monthly
   * @type {object}
   * @private
   */
  protected _renderRange = {
    start: toStartOfDay(),
    end: toStartOfDay()
  };

  private _mainApp?: AnyComponent<any, any>;

  constructor(container: string | Element, option: Option = {}) {
    super();

    this._container = isString(container) ? document.querySelector(container) : container;
    this._options = this.initOption(option);
    this._event = new EventHandler<InternalEventName>();
    this._outerEvent = this;
    this._context = {
      options: {
        defaultView: 'month'
      },
      theme: new Theme(option.theme),
      templates: extend(
        {
          'time-tmpl': ({ title }: { title: string }) => title
        },
        pick(option, 'templates')
      ),
      event: this._event,
      outerEvent: this._outerEvent
    };
  }

  protected abstract getComponent(): AnyComponent<any, any> | null;

  private getMainApp(): AnyComponent<any, any> {
    const main = this.getComponent();
    if (!main) {
      throw new Error('No Main Component');
    }
    if (!this._mainApp) {
      this._mainApp = contextPass(main, this._context);
    }

    return this._mainApp;
  }

  private initOption(option: Option = {}): Option {
    const {
      defaultView = this._viewName,
      taskView = true,
      scheduleView = true,
      template = {},
      week = {},
      month = {},
      calendars = [],
      useCreationPopup = false,
      useDetailPopup = false,
      timezones = [
        {
          timezoneOffset: 0,
          displayLabel: '',
          tooltip: ''
        }
      ],
      disableDblClick = false,
      disableClick = false,
      isReadOnly = false
    } = option;

    return {
      defaultView,
      taskView,
      scheduleView,
      template,
      week,
      month,
      calendars,
      useCreationPopup,
      useDetailPopup,
      timezones,
      disableDblClick,
      disableClick,
      isReadOnly
    };
  }

  /**
   * Destroys the instance.
   */
  public destroy() {
    if (this._container) {
      render('', this._container, this._base);
    }

    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        delete this[key];
      }
    }
  }

  /**
   * Move the calendar amount of offset value
   * @param {number} offset - The offset value.
   * @private
   * @example
   * // move previous week when "week" view.
   * // move previous month when "month" view.
   * calendar.move(-1);
   */
  private move(offset = 0) {
    console.log('move', offset);
  }

  /**
   * Set timezone offset
   * @param {number} offset - The offset (min)
   * @static
   * @deprecated
   * @example
   * var timezoneName = moment.tz.guess();
   * tui.Calendar.setTimezoneOffset(moment.tz.zone(timezoneName).utcOffset(moment()));
   */
  static setTimezoneOffset(offset: number) {
    console.log('setTimezoneOffset', offset);
  }

  /**
   * Set a callback function to get timezone offset by timestamp
   * @param {function} callback - The callback function
   * @static
   * @deprecated
   * @example
   * var timezoneName = moment.tz.guess();
   * tui.Calendar.setTimezoneOffsetCallback(function(timestamp) {
   *      return moment.tz.zone(timezoneName).utcOffset(timestamp));
   * });
   */
  static setTimezoneOffsetCallback(callback: (timestamp: number) => void) {
    console.log('setTimezoneOffsetCallback', callback);
  }

  /**********
   * CRUD Methods
   **********/

  /**
   * Create schedules and render calendar.
   * @param {Array.<Schedule>} schedules - {@link Schedule} data list
   * @param {boolean} [silent=false] - no auto render after creation when set true
   * @example
   * calendar.createSchedules([
   *     {
   *         id: '1',
   *         calendarId: '1',
   *         title: 'my schedule',
   *         category: 'time',
   *         dueDateClass: '',
   *         start: '2018-01-18T22:30:00+09:00',
   *         end: '2018-01-19T02:30:00+09:00'
   *     },
   *     {
   *         id: '2',
   *         calendarId: '1',
   *         title: 'second schedule',
   *         category: 'time',
   *         dueDateClass: '',
   *         start: '2018-01-18T17:30:00+09:00',
   *         end: '2018-01-19T17:31:00+09:00'
   *     }
   * ]);
   */
  createSchedules(schedules: ScheduleData[], silent = false) {
    console.log('createSchedules', schedules, silent);
  }

  /**
   * Get a {@link Schedule} object by schedule id and calendar id.
   * @param {string} scheduleId - ID of schedule
   * @param {string} calendarId - calendarId of the schedule
   * @returns {Schedule} schedule object
   * @example
   * var schedule = calendar.getSchedule(scheduleId, calendarId);
   * console.log(schedule.title);
   */
  getSchedule(scheduleId: string, calendarId: string) {
    console.log('getSchedule', scheduleId, calendarId);
  }

  /**
   * Update the schedule
   * @param {string} scheduleId - ID of a schedule to update
   * @param {string} calendarId - The calendarId of the schedule to update
   * @param {Schedule} scheduleData - The {@link Schedule} data to update
   * @param {boolean} [silent=false] - No auto render after creation when set true
   * @example
   * calendar.on('beforeUpdateSchedule', function(event) {
   *     var schedule = event.schedule;
   *     var startTime = event.start;
   *     var endTime = event.end;
   *     calendar.updateSchedule(schedule.id, schedule.calendarId, {
   *         start: startTime,
   *         end: endTime
   *     });
   * });
   */
  updateSchedule(
    scheduleId: string,
    calendarId: string,
    scheduleData: ScheduleData,
    silent = false
  ) {
    console.log('updateSchedule', scheduleId, calendarId, scheduleData, silent);
  }

  /**
   * Delete a schedule.
   * @param {string} scheduleId - ID of schedule to delete
   * @param {string} calendarId - The CalendarId of the schedule to delete
   * @param {boolean} [silent=false] - No auto render after creation when set true
   */
  deleteSchedule(scheduleId: string, calendarId: string, silent = false) {
    console.log('deleteSchedule', scheduleId, calendarId, silent);
  }

  /**********
   * General Methods
   **********/

  /**
   * Toggle schedules' visibility by calendar ID
   * @param {string} calendarId - The calendar id value
   * @param {boolean} toHide - Set true to hide schedules
   * @param {boolean} [renderImmediately=true] - set true then render after change visible property each models
   */
  toggleSchedules(calendarId: string, toHide: boolean, renderImmediately = true) {
    console.log('toggleSchedules', calendarId, toHide, renderImmediately);
  }

  /**
   * Render the calendar.
   * @example
   * var silent = true;
   * calendar.clear();
   * calendar.createSchedules(schedules, silent);
   * calendar.render();
   * @example
   * // Render a calendar when resizing a window.
   * window.addEventListener('resize', function() {
   *     calendar.render();
   * });
   */
  render() {
    // const main = this.getComponent();
    // const App = contextPass(main, this._context);
    const App = this.getMainApp();

    // if (this._base) {
    //   rerender();
    // } else {
    //   this._base = render(<App context={this._context} />, this._container);
    // }

    // if (this._base) {
    //   console.log('render()', this._base);
    if (this._container) {
      this._base = render(<App context={this._context} />, this._container, this._base);
    }
    // } else {
    //   this._base = render(<App context={this._context} />, this._container);
    //   console.log('render()', this._base);
    // }

    return this;
  }

  /**
   * for SSR(server side rendering)
   * @returns HTML string
   */
  renderToString(): string {
    const main = this.getComponent();
    if (!main) {
      throw new Error('No Main Component');
    }
    const App = contextPass(main, this._context);

    return renderToString.render(<App />);
  }

  /**
   * Delete all schedules and clear view.
   * @example
   * calendar.clear();
   * calendar.createSchedules(schedules, true);
   * calendar.render();
   */
  clear() {
    console.log('clear');
  }

  /**
   * Scroll to current time on today in case of daily, weekly view
   * @example
   * function onNewSchedules(schedules) {
   *     calendar.createSchedules(schedules);
   *     if (calendar.getViewName() !== 'month') {
   *         calendar.scrollToNow();
   *     }
   * }
   */
  scrollToNow() {
    console.log('scrollToNow');
  }

  /**
   * Move to today.
   * @example
   * function onClickTodayBtn() {
   *     calendar.today();
   * }
   */
  today() {
    console.log('today');
  }

  /**
   * Move to specific date
   * @param {DateType} date - The date to move
   * @example
   * calendar.on('clickDayname', function(event) {
   *     if (calendar.getViewName() === 'week') {
   *         calendar.setDate(new Date(event.date));
   *         calendar.changeView('day', true);
   *     }
   * });
   */
  setDate(date: DateType) {
    console.log('setDate', date);
  }

  /**
   * Move the calendar forward a day, a week, a month, 2 weeks, 3 weeks.
   * @example
   * function moveToNextOrPrevRange(val) {
      if (val === -1) {
          calendar.prev();
      } else if (val === 1) {
          calendar.next();
      }
  }
  */
  next() {
    this.move(1);
    this.render();
  }

  /**
   * Move the calendar backward a day, a week, a month, 2 weeks, 3 weeks.
   * @example
   * function moveToNextOrPrevRange(val) {
      if (val === -1) {
          calendar.prev();
      } else if (val === 1) {
          calendar.next();
      }
  }
  */
  prev() {
    this.move(-1);
    this.render();
  }

  /**
   * Change calendar's schedule color with option
   * @param {string} calendarId - The calendar ID
   * @param {CalendarColor} option - The {@link CalendarColor} object
   * @param {boolean} [silent=false] - No auto render after creation when set true
   * @example
   * calendar.setCalendarColor('1', {
   *     color: '#e8e8e8',
   *     bgColor: '#585858',
   *     borderColor: '#a1b56c'
   * });
   * calendar.setCalendarColor('2', {
   *     color: '#282828',
   *     bgColor: '#dc9656',
   *     borderColor: '#a1b56c'
   * });
   * calendar.setCalendarColor('3', {
   *     color: '#a16946',
   *     bgColor: '#ab4642',
   *     borderColor: '#a1b56c'
   * });
   */
  setCalendarColor(calendarId: string, option: CalendarColor, silent = false) {
    console.log('setCalendarColor', calendarId, option, silent);

    if (!silent) {
      this.render();
    }
  }

  /**
   * Change current view with view name('day', 'week', 'month')
   * @param {string} newViewName - The New view name to render
   * @param {boolean} [force=false] - Force render despite of current view and new view are equal
   * @example
   * // daily view
   * calendar.changeView('day', true);
   *
   * // weekly view
   * calendar.changeView('week', true);
   *
   * // monthly view(default 6 weeks view)
   * calendar.setOptions({month: {visibleWeeksCount: 6}}, true); // or null
   * calendar.changeView('month', true);
   *
   * // 2 weeks monthly view
   * calendar.setOptions({month: {visibleWeeksCount: 2}}, true);
   * calendar.changeView('month', true);
   *
   * // 3 weeks monthly view
   * calendar.setOptions({month: {visibleWeeksCount: 3}}, true);
   * calendar.changeView('month', true);
   *
   * // narrow weekend
   * calendar.setOptions({month: {narrowWeekend: true}}, true);
   * calendar.setOptions({week: {narrowWeekend: true}}, true);
   * calendar.changeView(calendar.getViewName(), true);
   *
   * // change start day of week(from monday)
   * calendar.setOptions({week: {startDayOfWeek: 1}}, true);
   * calendar.setOptions({month: {startDayOfWeek: 1}}, true);
   * calendar.changeView(calendar.getViewName(), true);
   *
   * // work week
   * calendar.setOptions({week: {workweek: true}}, true);
   * calendar.setOptions({month: {workweek: true}}, true);
   * calendar.changeView(calendar.getViewName(), true);
   */
  changeView(newViewName: string, force = false) {
    console.log('changeView', newViewName, force);

    this.move();
    this.render();
  }

  /**
   * @deprecated
   * Toggle task view('Milestone', 'Task') panel
   * @param {boolean} enabled - use task view
   * @example
   * // There is no milestone, task, so hide those view panel
   * calendar.toggleTaskView(false);
   *
   * // There are some milestone, task, so show those view panel.
   * calendar.toggleTaskView(true);
   */
  toggleTaskView(enabled: boolean) {
    console.log('toggleTaskView', enabled);
  }

  /**
   * @deprecated
   * Toggle schedule view('AllDay', TimeGrid') panel
   * @param {boolean} enabled - use task view
   * @example
   * // hide those view panel to show only 'Milestone', 'Task'
   * calendar.toggleScheduleView(false);
   *
   * // show those view panel.
   * calendar.toggleScheduleView(true);
   */
  toggleScheduleView(enabled: boolean) {
    console.log('toggleScheduleView', enabled);
  }

  /**
   * Get a schedule element by schedule id and calendar id.
   * @param {string} scheduleId - ID of schedule
   * @param {string} calendarId - calendarId of schedule
   * @returns {HTMLElement} schedule element if found or null
   * @example
   * var element = calendar.getElement(scheduleId, calendarId);
   * console.log(element);
   */
  getElement(scheduleId: string, calendarId: string) {
    console.log('getElement', scheduleId, calendarId);

    return null;
  }

  /**
 * Set a theme. If some keys are not defined in the preset, will be return.
 * @param {object} theme - multiple styles map
 * @returns {Array.<string>} keys - error keys not predefined.
 * @example
 * cal.setTheme({
    'month.dayname.height': '31px',
    'common.dayname.color': '#333',
    'month.dayname.borderBottom': '1px solid #e5e5e5' // Not valid key  will be return.
 * });
 */
  setTheme(theme: ThemeKeyValue) {
    const result = this._context.theme.setStyles(theme);
    this.render();

    return result;
  }

  /**
   * Set options of calendar
   * @param {Option} options - set {@link Option}
   * @param {boolean} [silent=false] - no auto render after creation when set true
   */
  setOptions(options: Option, silent = false) {
    console.log('setOptions', options, silent);
  }

  /**
   * Get current {@link Option}.
   * @returns {Option} options
   */
  getOptions() {
    return this._options;
  }

  /**
   * Current rendered date ({@link TZDate} for further information)
   * @returns {TZDate}
   */
  getDate() {
    console.log('getDate');

    return this._renderDate;
  }

  /**
   * Start time of rendered date range ({@link TZDate} for further information)
   * @returns {TZDate}
   */
  getDateRangeStart() {
    console.log('getDateRangeStart');

    return this._renderRange.start;
  }

  /**
   * End time of rendered date range ({@link TZDate} for further information)
   * @returns {TZDate}
   */
  getDateRangeEnd() {
    console.log('getDateRangeEnd');

    return this._renderRange.end;
  }

  /**
   * Get current view name('day', 'week', 'month')
   * @returns {string} view name
   */
  getViewName() {
    console.log('getViewName');

    return null;
  }

  /**
   * Set calendar list
   * @param {Array.<Object>} calendars - calendar list
   */
  setCalendars(calendars: CalendarData[]) {
    console.log('setCalendars', calendars);
  }

  /**
   * Open schedule creation popup
   * @param {Schedule} schedule - The preset {@link Schedule} data
   */
  openCreationPopup(schedule: ScheduleData) {
    console.log('openCreationPopup', schedule);
  }

  /**
   * Hide the more view
   */
  hideMoreView() {
    console.log('hideMoreView');
  }
}
