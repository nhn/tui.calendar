import { ComponentChild, h, render } from 'preact';
import renderToString from 'preact-render-to-string';

import { DateInterface, LocalDate } from '@toast-ui/date';

import { CalendarContainer } from '@src/calendarContainer';
import { initCalendarStore } from '@src/contexts/calendarStore';
import Theme from '@src/theme';
import { ThemeKeyValue } from '@src/theme/themeProps';
import TZDate from '@src/time/date';
import { toStartOfDay } from '@src/time/datetime';
import { EventBus, EventBusImpl } from '@src/utils/eventBus';
import { addAttributeHooks, removeAttributeHooks } from '@src/utils/sanitizer';
import { isNumber, isString } from '@src/utils/type';

import { ExternalEventTypes } from '@t/eventBus';
import { DateType, EventModelData } from '@t/events';
import { CalendarColor, CalendarInfo, CustomTimezone, Options } from '@t/options';
import { CalendarState, CalendarStore, Dispatchers, InternalStoreAPI } from '@t/store';

export default abstract class CalendarControl implements EventBus<ExternalEventTypes> {
  protected container: Element | null;

  /**
   * Current rendered date
   * @type {TZDate}
   * @private
   */
  protected renderDate: TZDate;

  /**
   * start and end date of weekly, monthly
   * @type {object}
   * @private
   */
  protected renderRange: {
    start: TZDate;
    end: TZDate;
  };

  protected eventBus: EventBus<ExternalEventTypes>;

  protected theme: Theme;

  protected store: InternalStoreAPI<CalendarStore>;

  constructor(container: string | Element, options: Options = {}) {
    const { timezone } = options;
    if (timezone) {
      this.setTimezone(timezone);
    }

    this.container = isString(container) ? document.querySelector(container) : container;

    this.renderDate = toStartOfDay();
    this.renderRange = {
      start: toStartOfDay(),
      end: toStartOfDay(),
    };

    this.theme = new Theme(options.theme);
    this.eventBus = new EventBusImpl<ExternalEventTypes>();
    this.store = initCalendarStore(this.initOptions(options));
    addAttributeHooks();
  }

  protected abstract getComponent(): ComponentChild;

  private getStoreState(): CalendarState;

  private getStoreState<Group extends keyof CalendarState>(group: Group): CalendarState[Group];

  private getStoreState<Group extends keyof CalendarState>(group?: Group) {
    const state = this.store.getState();

    return group ? state[group] : state;
  }

  private getStoreDispatchers(): Dispatchers;

  private getStoreDispatchers<Group extends keyof Dispatchers>(group: Group): Dispatchers[Group];

  private getStoreDispatchers<Group extends keyof Dispatchers>(group?: Group) {
    const dispatchers = this.store.getState().dispatch;

    return group ? dispatchers[group] : dispatchers;
  }

  private initOptions(options: Options = {}): Options {
    const {
      defaultView = 'month',
      taskView = true,
      eventView = true,
      template = {},
      week = {},
      month = {},
      calendars = [],
      useCreationPopup = false,
      useDetailPopup = false,
      disableDblClick = false,
      disableClick = false,
      isReadOnly = false,
    } = options;

    return {
      defaultView,
      taskView,
      eventView,
      template,
      week,
      month,
      calendars,
      useCreationPopup,
      useDetailPopup,
      disableDblClick,
      disableClick,
      isReadOnly,
    };
  }

  private setTimezone(timezone: CustomTimezone) {
    const { dateConstructor = LocalDate, offset, name = '' } = timezone;

    if (dateConstructor) {
      TZDate.setDateConstructor(dateConstructor);
    }

    TZDate.setTimezone(isNumber(offset) ? offset : name);
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    if (this.container) {
      render('', this.container);
    }

    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        delete this[key];
      }
    }

    this.store.clearListeners();
    this.eventBus.off();
    removeAttributeHooks();
  }

  /**
   * Move the calendar amount of offset value
   * @param {number} offset - The offset value.
   * @todo implement this
   * @example
   * // move previous week when "week" view.
   * // move previous month when "month" view.
   * calendar.move(-1);
   */
  private move(offset = 0) {
    // console.log('move', offset);
  }

  /**********
   * CRUD Methods
   **********/

  /**
   * Create events and render calendar.
   * @param {EventModelData[]} events - list of {@link EventModelData}
   * @example
   * calendar.createEvents([
   *   {
   *     id: '1',
   *     calendarId: '1',
   *     title: 'my event',
   *     category: 'time',
   *     dueDateClass: '',
   *     start: '2018-01-18T22:30:00+09:00',
   *     end: '2018-01-19T02:30:00+09:00',
   *   },
   *   {
   *     id: '2',
   *     calendarId: '1',
   *     title: 'second event',
   *     category: 'time',
   *     dueDateClass: '',
   *     start: '2018-01-18T17:30:00+09:00',
   *     end: '2018-01-19T17:31:00+09:00',
   *   },
   * ]);
   */
  createEvents(events: EventModelData[]) {
    const { createEvents } = this.getStoreDispatchers('calendar');

    createEvents(events);
  }

  /**
   * Get a {@link EventModel} object with event's id and calendar's id.
   * @param {string} eventId - event's id
   * @param {string} calendarId - calendar's id of the event
   * @returns {EventModel} event model object
   * @example
   * const event = calendar.getEvent(eventId, calendarId);
   *
   * console.log(event.title);
   */
  getEvent(eventId: string, calendarId: string) {
    const { events } = this.getStoreState('calendar');

    return events.single(
      ({ id, calendarId: eventCalendarId }) => id === eventId && eventCalendarId === calendarId
    );
  }

  /**
   * Update the event
   * @param {string} eventId - ID of an event to update
   * @param {string} calendarId - The calendarId of the event to update
   * @param {EventModelData} changes - The {@link EventModelData} data to update
   * @example
   * calendar.on('beforeUpdateEvent', function ({ event, changes }) {
   *   const { id, calendarId } = event;
   *
   *   calendar.updateEvent(id, calendarId, changes);
   * });
   */
  updateEvent(eventId: string, calendarId: string, changes: EventModelData) {
    const { updateEvent } = this.getStoreDispatchers('calendar');
    const event = this.getEvent(eventId, calendarId);

    if (event) {
      updateEvent({ event, eventData: changes });
    }
  }

  /**
   * Delete an event
   * @param {string} eventId - event's id to delete
   * @param {string} calendarId - The CalendarId of the event to delete
   */
  deleteEvent(eventId: string, calendarId: string) {
    const { deleteEvent } = this.getStoreDispatchers('calendar');
    const event = this.getEvent(eventId, calendarId);

    if (event) {
      deleteEvent(event);
    }
  }

  /**********
   * General Methods
   **********/

  /**
   * Toggle events' visibility by calendar ID
   * @param {string} calendarId - The calendar id value
   * @param {boolean} toHide - Set true to hide events
   * @param {boolean} [renderImmediately=true] - set true then render after change visible property each models
   * @todo implement this
   */
  toggleEvents(calendarId: string, toHide: boolean, renderImmediately = true) {
    // console.log('toggleEvents', calendarId, toHide, renderImmediately);
  }

  /**
   * Render the calendar.
   * @example
   * var silent = true;
   * calendar.clear();
   * calendar.createEvents(events, silent);
   * calendar.render();
   * @example
   * // Render a calendar when resizing a window.
   * window.addEventListener('resize', function() {
   *     calendar.render();
   * });
   */

  render() {
    if (this.container) {
      render(
        <CalendarContainer theme={this.theme} store={this.store} eventBus={this.eventBus}>
          {this.getComponent()}
        </CalendarContainer>,
        this.container
      );
    }

    return this;
  }

  /**
   * for SSR(server side rendering)
   * @returns HTML string
   */
  renderToString(): string {
    return renderToString(
      <CalendarContainer theme={this.theme} store={this.store} eventBus={this.eventBus}>
        {this.getComponent()}
      </CalendarContainer>
    );
  }

  /**
   * Delete all events and clear view.
   * @todo implement this
   * @example
   * calendar.clear();
   * calendar.createEvents(events, true);
   * calendar.render();
   */
  clear() {
    this.getStoreDispatchers('calendar').clearEvents();
  }

  /**
   * Scroll to current time on today in case of daily, weekly view
   * @todo implement this
   * @example
   * function onNewEvents(events) {
   *     calendar.createEvents(events);
   *     if (calendar.getViewName() !== 'month') {
   *         calendar.scrollToNow();
   *     }
   * }
   */
  scrollToNow() {
    // console.log('scrollToNow');
  }

  /**
   * Move to today.
   * @todo implement this
   * @example
   * function onClickTodayBtn() {
   *     calendar.today();
   * }
   */
  today() {
    // console.log('today');
  }

  /**
   * Move to specific date
   * @param {DateType} date - The date to move
   * @todo implement this
   * @example
   * calendar.on('clickDayname', function(event) {
   *     if (calendar.getViewName() === 'week') {
   *         calendar.setDate(new Date(event.date));
   *         calendar.changeView('day', true);
   *     }
   * });
   */
  setDate(date: DateType) {
    this.renderDate = new TZDate(date);
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
   * Change calendar's event color with options
   * @param {string} calendarId - The calendar ID
   * @param {CalendarColor} options - The {@link CalendarColor} object
   * @param {boolean} [silent=false] - No auto render after creation when set true
   * @todo implement this
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
  setCalendarColor(calendarId: string, options: CalendarColor, silent = false) {
    // console.log('setCalendarColor', calendarId, options, silent);

    if (!silent) {
      this.render();
    }
  }

  /**
   * Change current view with view name('day', 'week', 'month')
   * @param {string} newViewName - The New view name to render
   * @param {boolean} [force=false] - Force render despite of current view and new view are equal
   * @todo implement this
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
    // console.log('changeView', newViewName, force);

    this.move();
    this.render();
  }

  /**
   * @deprecated
   * Toggle task view('Milestone', 'Task') panel
   * @param {boolean} enabled - use task view
   * @todo implement this
   * @example
   * // There is no milestone, task, so hide those view panel
   * calendar.toggleTaskView(false);
   *
   * // There are some milestone, task, so show those view panel.
   * calendar.toggleTaskView(true);
   */
  toggleTaskView(enabled: boolean) {
    // console.log('toggleTaskView', enabled);
  }

  /**
   * @deprecated
   * Toggle event view('Allday', TimeGrid') panel
   * @param {boolean} enabled - use task view
   * @todo remove this
   * @example
   * // hide those view panel to show only 'Milestone', 'Task'
   * calendar.toggleEventView(false);
   *
   * // show those view panel.
   * calendar.toggleEventView(true);
   */
  toggleEventView(enabled: boolean) {
    // console.log('toggleEventView', enabled);
  }

  /**
   * Get a event element by event id and calendar id.
   * @param {string} eventId - ID of event
   * @param {string} calendarId - calendarId of event
   * @returns {HTMLElement} event element if found or null
   * @todo implement this
   * @example
   * var element = calendar.getElement(eventId, calendarId);
   * console.log(element);
   */
  getElement(eventId: string, calendarId: string) {
    // console.log('getElement', eventId, calendarId);

    return null;
  }

  /**
 * Set a theme. If some keys are not defined in the preset, will be return.
 * @param {object} theme - multiple styles map
 * @returns {Array.<string>} keys - error keys not predefined.
 * @todo implement this
 * @example
 * cal.setTheme({
    'month.dayname.height': '31px',
    'common.dayname.color': '#333',
    'month.dayname.borderBottom': '1px solid #e5e5e5' // Not valid key  will be return.
 * });
 */
  setTheme(theme: ThemeKeyValue) {
    const result = this.theme.setStyles(theme);
    this.render();

    return result;
  }

  /**
   * Set options of calendar
   * @param {Options} options - set {@link Options}
   * @param {boolean} [silent=false] - no auto render after creation when set true
   * @todo implement this
   */
  setOptions(options: Options, silent = false) {
    // console.log('setOptions', options, silent);
  }

  /**
   * Get current {@link Options}.
   * @returns {Options} options
   */
  getOptions() {
    return this.store.getState().options;
  }

  /**
   * Current rendered date
   * @returns {Date}
   */
  getDate(): Date {
    return this.renderDate.toDate();
  }

  getDateInterface(): DateInterface {
    return this.renderDate.toCustomDate();
  }

  /**
   * Start time of rendered date range ({@link TZDate} for further information)
   * @returns {TZDate}
   * @todo implement this
   */
  getDateRangeStart() {
    // console.log('getDateRangeStart');

    return this.renderRange.start;
  }

  /**
   * End time of rendered date range ({@link TZDate} for further information)
   * @returns {TZDate}
   * @todo implement this
   */
  getDateRangeEnd() {
    // console.log('getDateRangeEnd');

    return this.renderRange.end;
  }

  /**
   * Get current view name('day', 'week', 'month')
   * @returns {string} view name
   * @todo implement this
   */
  getViewName() {
    // console.log('getViewName');

    return null;
  }

  /**
   * Set calendar list
   * @param {Array.<Object>} calendars - calendar list
   * @todo implement this
   */
  setCalendars(calendars: CalendarInfo[]) {
    // console.log('setCalendars', calendars);
  }

  /**
   * Open event creation popup
   * @param {EventModelData} event - The preset {@link EventModelData} data
   * @todo implement this
   */
  openCreationPopup(event: EventModelData) {
    // console.log('openCreationPopup', event);
  }

  fire<EventName extends keyof ExternalEventTypes>(
    eventName: EventName,
    ...args: Parameters<ExternalEventTypes[EventName]>
  ): EventBus<ExternalEventTypes> {
    this.eventBus.fire(eventName, ...args);

    return this;
  }

  off<EventName extends keyof ExternalEventTypes>(
    eventName?: EventName,
    handler?: ExternalEventTypes[EventName]
  ): EventBus<ExternalEventTypes> {
    this.eventBus.off(eventName, handler);

    return this;
  }

  on<EventName extends keyof ExternalEventTypes>(
    eventName: EventName,
    handler: ExternalEventTypes[EventName]
  ): EventBus<ExternalEventTypes> {
    this.eventBus.on(eventName, handler);

    return this;
  }

  once<EventName extends keyof ExternalEventTypes>(
    eventName: EventName,
    handler: ExternalEventTypes[EventName]
  ): EventBus<ExternalEventTypes> {
    this.eventBus.once(eventName, handler);

    return this;
  }
}
