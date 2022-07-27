import type { ComponentChild } from 'preact';
import { h, render } from 'preact';
import { unmountComponentAtNode } from 'preact/compat';
import renderToString from 'preact-render-to-string';

import type { DeepPartial } from 'ts-essentials';
import sendHostname from 'tui-code-snippet/request/sendHostname';

import { CalendarContainer } from '@src/calendarContainer';
import { GA_TRACKING_ID } from '@src/constants/statistics';
import { initCalendarStore } from '@src/contexts/calendarStore';
import { initThemeStore } from '@src/contexts/themeStore';
import { createDateMatrixOfMonth, getWeekDates } from '@src/helpers/grid';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';
import { addDate, addMonths, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { last } from '@src/utils/array';
import type { EventBus } from '@src/utils/eventBus';
import { EventBusImpl } from '@src/utils/eventBus';
import { addAttributeHooks, removeAttributeHooks } from '@src/utils/sanitizer';
import { isNil, isPresent, isString } from '@src/utils/type';

import type { ExternalEventTypes, InternalEventTypes, ScrollBehaviorOptions } from '@t/eventBus';
import type { DateType, EventObject } from '@t/events';
import type { CalendarColor, CalendarInfo, Options, ViewType } from '@t/options';
import type {
  CalendarMonthOptions,
  CalendarState,
  CalendarStore,
  CalendarWeekOptions,
  Dispatchers,
  InternalStoreAPI,
} from '@t/store';
import type { ThemeState, ThemeStore } from '@t/theme';

/**
 * {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents CustomEvents} document at {@link https://github.com/nhn/tui.code-snippet tui-code-snippet}
 * @typedef {CustomEvents} CustomEvents
 */

/**
 * Define Calendars to group events.
 *
 * @typedef {object} CalendarInfo
 * @property {string} id - Calendar id.
 * @property {string} name - Calendar name.
 * @property {string} color - Text color of events.
 * @property {string} borderColor - Left border color of events.
 * @property {string} backgroundColor - Background color of events.
 * @property {string} dragBackgroundColor - Background color of events during dragging.
 */

/**
 * Timezone options of the calendar instance.
 *
 * For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#timezone|Timezone options} in guide.
 *
 * @typedef {object} TimezoneOptions
 * @example
 * const calendar = new Calendar('#container', {
 *   timezone: {
 *     // @property {string} zones[].timezoneName - Timezone name. it should be one of IANA timezone names.
 *     // @property {string} [zones[].displayLabel] - Display label of timezone.
 *     // @property {string} [zones[].tooltip] - Tooltip of the element of the display label.
 *     zones: [
 *       {
 *         timezoneName: 'Asia/Seoul',
 *         displayLabel: 'UTC+9:00',
 *         tooltip: 'Seoul'
 *       },
 *       {
 *         timezoneName: 'Europe/London',
 *         displayLabel: 'UTC+1:00',
 *         tooltip: 'BST'
 *       }
 *     ],
 *     // This function will be called for rendering components for each timezone.
 *     // You don't have to use it if you're able to `Intl.DateTimeFormat` API with `timeZone` option.
 *     // this function should return timezone offset from UTC.
 *     // for instance, using moment-timezone:
 *     customOffsetCalculator: (timezoneName, timestamp) => {
 *       return moment.tz(timezoneName).utcOffset(timestamp);
 *     }
 *   }
 * });
 * @property {Array.<object>} zones - Timezone data.
 * @property {string} zones[].timezoneName - Timezone name. it should be one of IANA timezone names.
 * @property {string} [zones[].displayLabel] - Display label of timezone.
 * @property {string} [zones[].tooltip] - Tooltip of the element of the display label.
 * @property {function} customOffsetCalculator - Custom offset calculator when you're not able to leverage `Intl.DateTimeFormat` API.
 */

/**
 * Object to create/modify events.
 * @typedef {object} EventObject
 * @property {string} [id] - Event id.
 * @property {string} [calendarId] - Calendar id.
 * @property {string} [title] - Event title.
 * @property {string} [body] - Body content of the event.
 * @property {string} [isAllday] - Whether the event is all day or not.
 * @property {string|number|Date|TZDate} [start] - Start time of the event.
 * @property {string|number|Date|TZDate} [end] - End time of the event.
 * @property {number} [goingDuration] - Travel time which is taken to go in minutes.
 * @property {number} [comingDuration] - Travel time which is taken to come back in minutes.
 * @property {string} [location] - Location of the event.
 * @property {Array.<string>} [attendees] - Attendees of the event.
 * @property {string} [category] - Category of the event. Available categories are 'milestone', 'task', 'time' and 'allday'.
 * @property {string} [dueDateClass] - Classification of work events. (before work, before lunch, before work)
 * @property {string} [recurrenceRule] - Recurrence rule of the event.
 * @property {string} [state] - State of the event. Available states are 'Busy', 'Free'.
 * @property {boolean} [isVisible] - Whether the event is visible or not.
 * @property {boolean} [isPending] - Whether the event is pending or not.
 * @property {boolean} [isFocused] - Whether the event is focused or not.
 * @property {boolean} [isReadOnly] - Whether the event is read only or not.
 * @property {boolean} [isPrivate] - Whether the event is private or not.
 * @property {string} [color] - Text color of the event.
 * @property {string} [backgroundColor] - Background color of the event.
 * @property {string} [dragBackgroundColor] - Background color of the event during dragging.
 * @property {string} [borderColor] - Left border color of the event.
 * @property {object} [customStyle] - Custom style of the event. The key of CSS property should be camelCase (e.g. {'fontSize': '12px'})
 * @property {*} [raw] - Raw data of the event. it's an arbitrary property for anything.
 */

/**
 * CalendarCore class
 *
 * @class CalendarCore
 * @mixes CustomEvents
 * @param {string|Element} container - container element or selector.
 * @param {object} options - calendar options. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/calendar.md|Calendar options} in guide.
 *   @param {string} [options.defaultView="week"] - Initial view type. Available values are: 'day', 'week', 'month'.
 *   @param {boolean} [options.useFormPopup=false] - Whether to use the default form popup when creating/modifying events.
 *   @param {boolean} [options.useDetailPopup=false] - Whether to use the default detail popup when clicking events.
 *   @param {boolean} [options.isReadOnly=false] - Whether the calendar is read-only.
 *   @param {boolean} [options.usageStatistics=true] - Whether to allow collect hostname and send the information to google analytics.
 *                                              For more information, check out the {@link https://github.com/nhn/tui.calendar/blob/main/apps/calendar/README.md#collect-statistics-on-the-use-of-open-source|documentation}.
 *   @param {function} [options.eventFilter] - A function that returns true if the event should be displayed. The default filter checks if the event's `isVisible` property is true.
 *   @param {object} [options.week] - Week option of the calendar instance.
 *     @param {number} [options.week.startDayOfWeek=0] - Start day of the week. Available values are 0 (Sunday) to 6 (Saturday).
 *     @param {Array.<string>} [options.week.dayNames] - Names of days of the week. Should be 7 items starting from Sunday to Saturday. If not specified, the default names are used.
 *                                               Default values are ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].
 *     @param {boolean} [options.week.workweek=false] - Whether to exclude Saturday and Sunday.
 *     @param {boolean} [options.week.showTimezoneCollapseButton=true] - Whether to show the timezone collapse button.
 *     @param {boolean} [options.week.timezonesCollapsed=false] - Whether to collapse the timezones.
 *     @param {number} [options.week.hourStart=0] - Start hour of the day. Available values are 0 to 24.
 *     @param {number} [options.week.hourEnd=24] - End hour of the day. Available values are 0 to 24. Must be greater than `hourStart`.
 *     @param {boolean} [options.week.narrowWeekend=false] - Whether to narrow down width of weekends to half.
 *     @param {boolean|Array.<string>} [options.week.eventView=true] - Determine which view to display events. Available values are 'allday' and 'time'. set to `false` to disable event view.
 *     @param {boolean|Array.<string>} [options.week.taskView=true] - Determine which view to display tasks. Available values are 'milestone' and 'task'. set to `false` to disable task view.
 *     @param {boolean|object} [options.week.collapseDuplicateEvents=false] - Whether to collapse duplicate events. If you want to filter duplicate events and choose the main event based on your requirements, set `getDuplicateEvents` and `getMainEvent`. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#weekcollapseduplicateevents|Options} in guide.
 *   @param {object} options.month - Month option of the calendar instance.
 *     @param {number} [options.month.startDayOfWeek=0] - Start day of the week. Available values are 0 (Sunday) to 6 (Saturday).
 *     @param {Array.<string>} [options.month.dayNames] - Names of days of the week. Should be 7 items starting from Sunday to Saturday. If not specified, the default names are used.
 *                                                Default values are ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].
 *     @param {boolean} [options.month.workweek=false] - Whether to exclude Saturday and Sunday.
 *     @param {boolean} [options.month.narrowWeekend=false] - Whether to narrow down width of weekends to half.
 *     @param {number} [options.month.visibleWeeksCount=0] - Number of weeks to display. 0 means display all weeks.
 *   @param {Array.<CalendarInfo>} [options.calendars] - Calendars to group events.
 *   @param {boolean|object} [options.gridSelection=true] - Whether to enable grid selection. or it's option. it's enabled when the value is `true` and object and will be disabled when `isReadOnly` is true.
 *     @param {boolean} options.gridSelection.enableDbClick - Whether to enable double click to select area.
 *     @param {boolean} options.gridSelection.enableClick - Whether to enable click to select area.
 *   @param {TimezoneOptions} options.timezone - Timezone option of the calendar instance. For more information about timezone, check out the {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md|Options} in guide.
 *   @param {Theme} options.theme - Theme option of the calendar instance. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/theme.md|Theme} in guide.
 *   @param {TemplateConfig} options.template - Template option of the calendar instance. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/template.md|Template} in guide.
 */
export default abstract class CalendarCore
  implements EventBus<ExternalEventTypes & InternalEventTypes>
{
  protected container: Element | null;

  /**
   * start and end date of weekly, monthly
   * @private
   */
  protected renderRange: {
    start: TZDate;
    end: TZDate;
  };

  protected eventBus: EventBus<ExternalEventTypes & InternalEventTypes>;

  protected theme: InternalStoreAPI<ThemeStore>;

  protected store: InternalStoreAPI<CalendarStore>;

  constructor(container: string | Element, options: Options = {}) {
    // NOTE: Handling server side rendering. When container is not specified,
    this.container = isString(container) ? document?.querySelector(container) ?? null : container;

    this.theme = initThemeStore(options.theme);
    this.eventBus = new EventBusImpl<ExternalEventTypes & InternalEventTypes>();
    this.store = initCalendarStore(options);

    this.renderRange = this.calculateRenderRange(toStartOfDay());

    addAttributeHooks();

    // NOTE: To make sure the user really wants to do this. Ignore any invalid values.
    if (this.getStoreState().options.usageStatistics === true) {
      sendHostname('calendar', GA_TRACKING_ID);
    }
  }

  protected abstract getComponent(): ComponentChild;

  protected getStoreState(): CalendarState;

  protected getStoreState<Group extends keyof CalendarState>(group: Group): CalendarState[Group];

  protected getStoreState<Group extends keyof CalendarState>(group?: Group) {
    const state = this.store.getState();

    return group ? state[group] : state;
  }

  protected getStoreDispatchers(): Dispatchers;

  protected getStoreDispatchers<Group extends keyof Dispatchers>(group: Group): Dispatchers[Group];

  protected getStoreDispatchers<Group extends keyof Dispatchers>(group?: Group) {
    const dispatchers = this.store.getState().dispatch;

    return group ? dispatchers[group] : dispatchers;
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    if (this.container) {
      unmountComponentAtNode(this.container);
    }

    this.store.clearListeners();
    this.theme.clearListeners();
    this.eventBus.off();
    removeAttributeHooks();

    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        delete this[key];
      }
    }
  }

  private calculateMonthRenderDate({
    renderDate,
    offset,
    monthOptions,
  }: {
    renderDate: TZDate;
    offset: number;
    monthOptions: CalendarMonthOptions;
  }) {
    let newRenderDate = new TZDate(renderDate);
    const { visibleWeeksCount } = monthOptions;

    if (visibleWeeksCount > 0) {
      newRenderDate = addDate(newRenderDate, offset * 7 * visibleWeeksCount);
    } else {
      newRenderDate = addMonths(newRenderDate, offset);
    }
    const dateMatrix = createDateMatrixOfMonth(newRenderDate, monthOptions);

    const [[start]] = dateMatrix;
    const end = last(last(dateMatrix));

    return {
      renderDate: newRenderDate,
      renderRange: { start, end },
    };
  }

  private calculateWeekRenderDate({
    renderDate,
    offset,
    weekOptions,
  }: {
    renderDate: TZDate;
    offset: number;
    weekOptions: CalendarWeekOptions;
  }) {
    const newRenderDate = new TZDate(renderDate);
    newRenderDate.addDate(offset * 7);
    const weekDates = getWeekDates(newRenderDate, weekOptions);

    const [start] = weekDates;
    const end = last(weekDates);

    return {
      renderDate: newRenderDate,
      renderRange: { start, end },
    };
  }

  private calculateDayRenderDate({ renderDate, offset }: { renderDate: TZDate; offset: number }) {
    const newRenderDate = new TZDate(renderDate);
    newRenderDate.addDate(offset);

    const start = toStartOfDay(newRenderDate);
    const end = toEndOfDay(newRenderDate);

    return {
      renderDate: newRenderDate,
      renderRange: { start, end },
    };
  }

  /**
   * Move the rendered date to the next/prev range.
   *
   * The range of movement differs depending on the current view, Basically:
   *   - In month view, it moves to the next/prev month.
   *   - In week view, it moves to the next/prev week.
   *   - In day view, it moves to the next/prev day.
   *
   * Also, the range depends on the options like how many visible weeks/months should be rendered.
   *
   * @param {number} offset The offset to move by.
   *
   * @example
   * // Move to the next month in month view.
   * calendar.move(1);
   *
   * // Move to the next year in month view.
   * calendar.move(12);
   *
   * // Move to yesterday in day view.
   * calendar.move(-1);
   */
  move(offset: number) {
    if (isNil(offset)) {
      return;
    }

    const { currentView, renderDate } = this.getStoreState().view;
    const { options } = this.getStoreState();
    const { setRenderDate } = this.getStoreDispatchers().view;

    const newRenderDate = new TZDate(renderDate);

    let calculatedRenderDate = {
      renderDate: newRenderDate,
      renderRange: { start: new TZDate(newRenderDate), end: new TZDate(newRenderDate) },
    };

    if (currentView === 'month') {
      calculatedRenderDate = this.calculateMonthRenderDate({
        renderDate,
        offset,
        monthOptions: options.month as CalendarMonthOptions,
      });
    } else if (currentView === 'week') {
      calculatedRenderDate = this.calculateWeekRenderDate({
        renderDate,
        offset,
        weekOptions: options.week as CalendarWeekOptions,
      });
    } else if (currentView === 'day') {
      calculatedRenderDate = this.calculateDayRenderDate({ renderDate, offset });
    }

    setRenderDate(calculatedRenderDate.renderDate);
    this.renderRange = calculatedRenderDate.renderRange;
  }

  /**********
   * CRUD Methods
   **********/

  /**
   * Create events and render calendar.
   * @param {Array.<EventObject>} events - list of {@link EventObject}
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
  createEvents(events: EventObject[]) {
    const { createEvents } = this.getStoreDispatchers('calendar');

    createEvents(events);
  }

  protected getEventModel(eventId: string, calendarId: string) {
    const { events } = this.getStoreState('calendar');

    return events.find(
      ({ id, calendarId: eventCalendarId }) => id === eventId && eventCalendarId === calendarId
    );
  }

  /**
   * Get an {@link EventObject} with event's id and calendar's id.
   *
   * @param {string} eventId - event's id
   * @param {string} calendarId - calendar's id of the event
   * @returns {EventObject|null} event. If the event can't be found, it returns null.
   *
   * @example
   * const event = calendar.getEvent(eventId, calendarId);
   *
   * console.log(event.title);
   */
  getEvent(eventId: string, calendarId: string) {
    return this.getEventModel(eventId, calendarId)?.toEventObject() ?? null;
  }

  /**
   * Update an event.
   *
   * @param {string} eventId - ID of an event to update
   * @param {string} calendarId - The calendarId of the event to update
   * @param {EventObject} changes - The new {@link EventObject} data to apply to the event
   *
   * @example
   * calendar.on('beforeUpdateEvent', function ({ event, changes }) {
   *   const { id, calendarId } = event;
   *
   *   calendar.updateEvent(id, calendarId, changes);
   * });
   */
  updateEvent(eventId: string, calendarId: string, changes: EventObject) {
    const { updateEvent } = this.getStoreDispatchers('calendar');
    const event = this.getEventModel(eventId, calendarId);

    if (event) {
      updateEvent({ event, eventData: changes });
    }
  }

  /**
   * Delete an event.
   *
   * @param {string} eventId - event's id to delete
   * @param {string} calendarId - The CalendarId of the event to delete
   */
  deleteEvent(eventId: string, calendarId: string) {
    const { deleteEvent } = this.getStoreDispatchers('calendar');
    const event = this.getEventModel(eventId, calendarId);

    if (event) {
      deleteEvent(event);
    }
  }

  /**********
   * General Methods
   **********/

  /**
   * Set events' visibility by calendar ID
   *
   * @param {string|Array.<string>} calendarId - The calendar id or ids to change visibility
   * @param {boolean} isVisible - If set to true, show the events. If set to false, hide the events.
   */
  setCalendarVisibility(calendarId: string | string[], isVisible: boolean) {
    const { setCalendarVisibility } = this.getStoreDispatchers('calendar');
    const calendarIds = Array.isArray(calendarId) ? calendarId : [calendarId];

    setCalendarVisibility(calendarIds, isVisible);
  }

  /**
   * Render the calendar.
   *
   * @example
   * calendar.render();
   *
   * @example
   * // Re-render the calendar when resizing a window.
   * window.addEventListener('resize', () => {
   *   calendar.render();
   * });
   */
  render() {
    if (isPresent(this.container)) {
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
   * For SSR(Server Side Rendering), Return the HTML string of the whole calendar.
   *
   * @returns {string} HTML string
   */
  renderToString(): string {
    return renderToString(
      <CalendarContainer theme={this.theme} store={this.store} eventBus={this.eventBus}>
        {this.getComponent()}
      </CalendarContainer>
    );
  }

  /**
   * Delete all events and clear view
   *
   * @example
   * calendar.clear();
   */
  clear() {
    const { clearEvents } = this.getStoreDispatchers('calendar');

    clearEvents();
  }

  /**
   * Scroll to current time on today in case of daily, weekly view.
   * Nothing happens in the monthly view.
   *
   * @example
   * function onNewEvents(events) {
   *   calendar.createEvents(events);
   *   calendar.scrollToNow('smooth');
   * }
   */
  scrollToNow(scrollBehavior: ScrollBehaviorOptions = 'auto') {
    this.eventBus.fire('scrollToNow', scrollBehavior);
  }

  private calculateRenderRange(renderDate: TZDate) {
    const { currentView } = this.getStoreState().view;
    const { options } = this.getStoreState();

    const newRenderDate = new TZDate(renderDate);

    let newRenderRange = { start: new TZDate(newRenderDate), end: new TZDate(newRenderDate) };

    if (currentView === 'month') {
      newRenderRange = this.calculateMonthRenderDate({
        renderDate,
        offset: 0,
        monthOptions: options.month as CalendarMonthOptions,
      }).renderRange;
    } else if (currentView === 'week') {
      newRenderRange = this.calculateWeekRenderDate({
        renderDate,
        offset: 0,
        weekOptions: options.week as CalendarWeekOptions,
      }).renderRange;
    } else if (currentView === 'day') {
      newRenderRange = this.calculateDayRenderDate({ renderDate, offset: 0 }).renderRange;
    }

    return newRenderRange;
  }

  /**
   * Move to today.
   *
   * @example
   * function onClickTodayBtn() {
   *   calendar.today();
   * }
   */
  today() {
    const { setRenderDate } = this.getStoreDispatchers().view;
    const today = new TZDate();

    setRenderDate(today);
    this.renderRange = this.calculateRenderRange(today);
  }

  /**
   * Move to specific date.
   *
   * @param {Date|string|number|TZDate} date - The date to move. it should be eligible parameter to create a `Date` instance if `date` is string or number.
   * @example
   * calendar.on('clickDayName', (event) => {
   *   if (calendar.getViewName() === 'week') {
   *     const dateToMove = new Date(event.date);
   *
   *     calendar.setDate(dateToMove);
   *     calendar.changeView('day');
   *   }
   * });
   */
  setDate(date: DateType) {
    const { setRenderDate } = this.getStoreDispatchers('view');
    const dateToChange = new TZDate(date);

    setRenderDate(dateToChange);
    this.renderRange = this.calculateRenderRange(dateToChange);
  }

  /**
   * Move the calendar forward to the next range.
   *
   * @example
   * function moveToNextOrPrevRange(offset) {
   *   if (offset === -1) {
   *     calendar.prev();
   *   } else if (offset === 1) {
   *     calendar.next();
   *   }
   * }
   */
  next() {
    this.move(1);
  }

  /**
   * Move the calendar backward to the previous range.
   *
   * @example
   * function moveToNextOrPrevRange(offset) {
   *   if (offset === -1) {
   *     calendar.prev();
   *   } else if (offset === 1) {
   *     calendar.next();
   *   }
   * }
   */
  prev() {
    this.move(-1);
  }

  /**
   * Change color values of events belong to a certain calendar.
   *
   * @param {string} calendarId - The calendar ID
   * @param {object} colorOptions - The color values of the calendar
   *   @param {string} colorOptions.color - The text color of the events
   *   @param {string} colorOptions.borderColor - Left border color of events
   *   @param {string} colorOptions.backgroundColor - Background color of events
   *   @param {string} colorOptions.dragBackgroundColor - Background color of events during dragging
   *
   * @example
   * calendar.setCalendarColor('1', {
   *     color: '#e8e8e8',
   *     backgroundColor: '#585858',
   *     borderColor: '#a1b56c',
   *     dragBackgroundColor: '#585858',
   * });
   * calendar.setCalendarColor('2', {
   *     color: '#282828',
   *     backgroundColor: '#dc9656',
   *     borderColor: '#a1b56c',
   *     dragBackgroundColor: '#dc9656',
   * });
   * calendar.setCalendarColor('3', {
   *     color: '#a16946',
   *     backgroundColor: '#ab4642',
   *     borderColor: '#a1b56c',
   *     dragBackgroundColor: '#ab4642',
   * });
   */
  setCalendarColor(calendarId: string, colorOptions: CalendarColor) {
    const { setCalendarColor } = this.getStoreDispatchers().calendar;

    setCalendarColor(calendarId, colorOptions);
  }

  /**
   * Change current view type.
   *
   * @param {string} viewName - The new view name to change to. Available values are 'month', 'week', 'day'.
   *
   * @example
   * // change to daily view
   * calendar.changeView('day');
   *
   * // change to weekly view
   * calendar.changeView('week');
   *
   * // change to monthly view
   * calendar.changeView('month');
   */
  changeView(viewName: ViewType) {
    const { changeView } = this.getStoreDispatchers('view');

    changeView(viewName);
    this.renderRange = this.calculateRenderRange(this.getDate());
  }

  /**
   * Get the DOM element of the event by event id and calendar id
   *
   * @param {string} eventId - ID of event
   * @param {string} calendarId - calendarId of event
   * @returns {HTMLElement} event element if found or null
   *
   * @example
   * const element = calendar.getElement(eventId, calendarId);
   *
   * console.log(element);
   */
  getElement(eventId: string, calendarId: string) {
    const event = this.getEvent(eventId, calendarId);

    if (event && this.container) {
      return this.container.querySelector(
        `[data-event-id="${eventId}"][data-calendar-id="${calendarId}"]`
      );
    }

    return null;
  }

  /**
   * Set the theme of the calendar.
   *
   * @param {Theme} theme - The theme object to apply. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/theme.md|Theme} in guide.
   *
   * @example
   * calendar.setTheme({
   *   common: {
   *     gridSelection: {
   *       backgroundColor: '#333',
   *     },
   *   },
   *   week: {
   *     nowIndicatorLabel: {
   *       color: '#00FF00',
   *     },
   *   },
   *   month: {
   *     dayName: {
   *       borderLeft: '1px solid #e5e5e5',
   *     },
   *   },
   * });
   */
  setTheme(theme: DeepPartial<ThemeState>) {
    const { setTheme } = this.theme.getState().dispatch;

    setTheme(theme);
  }

  /**
   * Get current options.
   *
   * @returns {Options} - The current options of the instance
   */
  getOptions() {
    const { options, template } = this.getStoreState();
    const { dispatch, ...theme } = this.theme.getState();

    return {
      ...options,
      template,
      theme,
    };
  }

  /**
   * Set options of calendar. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md|Options} in guide.
   *
   * @param {Options} options - The options to set
   */
  setOptions(options: Options) {
    // destructure options here for tui.doc to generate docs correctly
    const { theme, template, ...restOptions } = options;
    const { setTheme } = this.theme.getState().dispatch;
    const {
      options: { setOptions },
      template: { setTemplate },
    } = this.getStoreDispatchers();

    if (isPresent(theme)) {
      setTheme(theme);
    }

    if (isPresent(template)) {
      setTemplate(template);
    }

    setOptions(restOptions);
  }

  /**
   * Get current rendered date. (see {@link TZDate} for further information)
   *
   * @returns {TZDate}
   */
  getDate(): TZDate {
    const { renderDate } = this.getStoreState().view;

    return renderDate;
  }

  /**
   * Start time of rendered date range. (see {@link TZDate} for further information)
   *
   * @returns {TZDate}
   */
  getDateRangeStart() {
    return this.renderRange.start;
  }

  /**
   * End time of rendered date range. (see {@link TZDate} for further information)
   *
   * @returns {TZDate}
   */
  getDateRangeEnd() {
    return this.renderRange.end;
  }

  /**
   * Get current view name('day', 'week', 'month').
   *
   * @returns {string} current view name ('day', 'week', 'month')
   */
  getViewName(): ViewType {
    const { currentView } = this.getStoreState('view');

    return currentView;
  }

  /**
   * Set calendar list.
   *
   * @param {CalendarInfo[]} calendars - list of calendars
   */
  setCalendars(calendars: CalendarInfo[]) {
    const { setCalendars } = this.getStoreDispatchers().calendar;

    setCalendars(calendars);
  }

  // TODO: specify position of popup
  /**
   * Open event form popup with predefined form values.
   *
   * @param {EventObject} event - The predefined {@link EventObject} data to show in form.
   */
  openFormPopup(event: EventObject) {
    const { showFormPopup } = this.getStoreDispatchers().popup;

    const eventModel = new EventModel(event);
    const { title, location, start, end, isAllday, isPrivate, state: eventState } = eventModel;

    showFormPopup({
      isCreationPopup: true,
      event: eventModel,
      title,
      location,
      start,
      end,
      isAllday,
      isPrivate,
      eventState,
    });
  }

  clearGridSelections() {
    const { clearAll } = this.getStoreDispatchers().gridSelection;

    clearAll();
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
