import { ComponentChild, h, render } from 'preact';
import { unmountComponentAtNode } from 'preact/compat';
import renderToString from 'preact-render-to-string';

import { DateInterface, LocalDate } from '@toast-ui/date';

import { CalendarContainer } from '@src/calendarContainer';
import { initCalendarStore } from '@src/contexts/calendarStore';
import { createDateMatrixOfMonth, getWeekDates } from '@src/helpers/grid';
import EventModel from '@src/model/eventModel';
import Theme from '@src/theme';
import { ThemeKeyValue } from '@src/theme/themeProps';
import TZDate from '@src/time/date';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { last } from '@src/utils/array';
import { EventBus, EventBusImpl } from '@src/utils/eventBus';
import { addAttributeHooks, removeAttributeHooks } from '@src/utils/sanitizer';
import { isNumber, isString } from '@src/utils/type';

import { ExternalEventTypes } from '@t/eventBus';
import { DateType, EventModelData } from '@t/events';
import { CalendarColor, CalendarInfo, CustomTimezone, Options, ViewType } from '@t/options';
import {
  CalendarMonthOptions,
  CalendarState,
  CalendarStore,
  CalendarWeekOptions,
  Dispatchers,
  InternalStoreAPI,
} from '@t/store';

export default abstract class CalendarControl implements EventBus<ExternalEventTypes> {
  protected container: Element | null;

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
      defaultView = 'week',
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
      unmountComponentAtNode(this.container);
    }

    this.store.clearListeners();
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
    const newRenderDate = new TZDate(renderDate);
    const { visibleWeeksCount } = monthOptions;

    if (visibleWeeksCount > 0) {
      newRenderDate.addDate(offset * 7 * visibleWeeksCount);
    } else {
      newRenderDate.setMonth(renderDate.getMonth() + offset);
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

  private move(offset = 0) {
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
   * Delete all events and clear view
   * @example
   * calendar.clear();
   */
  clear() {
    const { clearEvents } = this.getStoreDispatchers('calendar');

    clearEvents();
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
   * Move to today
   * @example
   * function onClickTodayBtn() {
   *   calendar.today();
   * }
   */
  today() {
    const { setRenderDate } = this.getStoreDispatchers().view;

    setRenderDate(new TZDate());
  }

  /**
   * Move to specific date
   * @param {DateType} date - The date to move
   * @example
   * calendar.on('clickDayname', (event) => {
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

    setRenderDate(new TZDate(date));
  }

  /**
   * Move the calendar forward a day, a week, a month, 2 weeks, 3 weeks.
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
   * Move the calendar backward a day, a week, a month, 2 weeks, 3 weeks.
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
   * @param {ViewType} viewName - The new view name to change
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
   * Set a theme. If some keys are not defined in the preset, will be return
   * @param {ThemeKeyValue} theme - theme object
   * @returns {string[]} invalid keys - not defined keys in theme
   * @example
   * calendar.setTheme({
   *   'common.gridSelection.backgroundColor': '#333',
   *   'week.currentTime.color': '#00FF00',
   *   'month.dayname.borderBottom': '1px solid #e5e5e5' // Invalid key. So, It will be returned
   * });
   */
  setTheme(theme: ThemeKeyValue) {
    const result = this.theme.setStyles(theme);
    this.render(); // @TODO: It should be removed when theme is implemented as a store

    return result;
  }

  /**
   * Get current {@link Options}
   * @returns {Options} options
   */
  getOptions() {
    const { options } = this.getStoreState();

    return options;
  }

  /**
   * Set options of calendar
   * @param {Options} options - set {@link Options}
   */
  setOptions(options: Options) {
    const { setOptions } = this.getStoreDispatchers().options;

    setOptions(options);
  }

  /**
   * Get current rendered date
   * @returns {TZDate}
   */
  getDate(): TZDate {
    const { renderDate } = this.getStoreState().view;

    return renderDate;
  }

  /**
   * Get custom date of current rendered date
   * @returns {DateInterface}
   */
  getDateInterface(): DateInterface {
    const { renderDate } = this.getStoreState().view;

    return renderDate.toCustomDate();
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
   * @returns {ViewType} current view name
   */
  getViewName(): ViewType {
    const { currentView } = this.getStoreState('view');

    return currentView;
  }

  /**
   * Set calendar list
   * @param {CalendarInfo[]} calendars - calendar list
   */
  setCalendars(calendars: CalendarInfo[]) {
    const { setCalendars } = this.getStoreDispatchers().calendar;

    setCalendars(calendars);
  }

  /**
   * Open event form popup
   * @param {EventModelData} eventModelData - The preset {@link EventModelData} data
   */
  openFormPopup(eventModelData: EventModelData) {
    const { showFormPopup } = this.getStoreDispatchers().popup;

    const event = EventModel.create(eventModelData);
    const { title, location, start, end, isAllday, isPrivate, state: eventState } = event;

    showFormPopup({
      isCreationPopup: true,
      event,
      title,
      location,
      start,
      end,
      isAllday,
      isPrivate,
      eventState,
    });
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
