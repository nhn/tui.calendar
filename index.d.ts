// Type definitions for TOAST UI Calendar v1.15.3
// TypeScript Version: 3.2.1

export type DateType = string | Date | TZDate;
export type EventHandlerType = IEvents[keyof IEvents];
export type CustomEventType = keyof IEvents;

export interface IEventObject {
    schedule: ISchedule;
    changes: ISchedule | null;
    end: TZDate;
    start: TZDate;
    calendar?: ICalendarInfo;
    triggerEventName?: 'click' | 'dblclick';
}

export interface IEventDateObject {
    date: string;
}

export interface IEventMoreObject {
    date: TZDate;
    target: Element;
}

export interface IEventScheduleObject {
    calendar: ICalendarInfo;
    event: MouseEvent;
    schedule: ISchedule;
}

export interface ITimeCreationGuide {
    guideElement: HTMLElement;
    guideTimeElement: HTMLElement;
    clearGuideElement: () => void;
}

export interface IMonthGuide {
    guideElements: HTMLElement[];
    clearGuideElements: () => void;
}

export interface IDayGridCreationGuide {
    guideElement: HTMLElement;
    clearGuideElement: () => void;
}

export interface IEventWithCreationPopup extends Pick<ISchedule, 'start' | 'end' | 'state' | 'title' | 'location'> {
    calendarId: string | number | null;
    useCreationPopup: true;
    isAllDay: boolean;
}

export interface IEventWithoutCreationPopup {
    start: TZDate;
    end: TZDate;
    isAllDay: boolean;
    triggerEventName: 'click' | 'dblclick' | 'mouseup';
    /**
     * Depending on the position when creating the schedule creation guide.
     *
     * - `ITimeCreationGuide`: In Week/Day view, trying to create a timely schedule.
     * - `IDayGridCreationGuide`: In Week/Day view, trying to create a all-day schedule.
     * - `IMonthGuide`: In Month view, trying to create a schedule with a range of days.
     */
    guide: ITimeCreationGuide | IDayGridCreationGuide | IMonthGuide;
}

/**
 * Cast `IEventWithCreationPopup` if you enabled the `useCreationPopup` option.
 *
 * Otherwise use `IEventWithoutCreationPopup`.
 *
 * You might need to implement and use type guard functions to narrow down the type of the event.
 *
 * @example
 * ```
 * const cal = new Calendar({
 *   useCreationPopup: true,
 *   // ...
 * });
 *
 *
 * function isUsingCreationPopup(event: TEventBeforeCreateSchedule): event is IEventWithCreationPopup {
 *   return 'useCreationPopup' in event;
 * }
 * function isMonthViewCreationGuide(guide: IEventWithoutCreationPopup['guide']): guide is IMonthGuide {
 *   return 'guideElements' in guide;
 * }
 *
 * cal.on('beforeCreateSchedule', e => {
 *   if (!isUsingCreationPopup(e)) {
 *     // ...
 *     if (isMonthViewCreationGuide(e.guide)) {
 *       e.guide.clearElements();
 *       // ...
 *     }
 *   }
 * });
 *
 * // or you can just cast it with `as` keyword.
 * cal.on('beforeCreateSchedule', e => {
 *   const event = e as IEventWithCreationPopup;
 * });
 * ```
 */
export type TEventBeforeCreateSchedule = IEventWithCreationPopup | IEventWithoutCreationPopup;

export interface IEvents {
    'afterRenderSchedule'?: (eventObj: {schedule: ISchedule}) => void;
    'beforeCreateSchedule'?: (schedule: TEventBeforeCreateSchedule) => void;
    'beforeDeleteSchedule'?: (eventObj: IEventScheduleObject) => void;
    'beforeUpdateSchedule'?: (eventObj: IEventObject) => void;
    'clickDayname'?: (eventObj: IEventDateObject) => void;
    'clickMore'?: (eventObj: IEventMoreObject) => void;
    'clickSchedule'?: (eventObj: IEventScheduleObject) => void;
    'clickTimezonesCollapseBtn'?: (timezonesCollapsed: boolean) => void;
}

export class TZDate {
    public getTime(): number;
    public toDate(): Date;
    public toUTCString(): string;
}

export interface ICalendarColor {
    color?: string;
    bgColor?: string;
    dragBgColor?: string;
    borderColor?: string;
}

export interface ITimeGridHourLabel {
    hidden: boolean;
    hour: number;
    minutes: number;
}

export interface ITimezoneHourMarker {
    hourmarker: TZDate;
    dateDifferenceSign: string;
    dateDifference: number;
}

export interface IGridDateModel {
    date: string;
    day: number;
    hiddenSchedules: number;
    isOtherMonth: boolean;
    isToday: boolean;
    month: number;
    ymd: string;
}

export interface IWeekDayNameInfo {
    date: number;
    day: number;
    dayName: string;
    isToday: boolean;
    renderDate: string;
}

export interface IMonthDayNameInfo {
    day: number;
    label: string;
}

export interface ITemplateConfig {
    milestoneTitle?: () => string;
    milestone?: (schedule: ISchedule) => string;
    taskTitle?: () => string;
    task?: (schedule: ISchedule) => string;
    alldayTitle?: () => string;
    allday?: (schedule: ISchedule) => string;
    time?: (schedule: ISchedule) => string;
    goingDuration?: (schedule: ISchedule) => string;
    comingDuration?: (schedule: ISchedule) => string;
    monthMoreTitleDate?: (date: string, dayname: string) => string;
    monthMoreClose?: () => string;
    monthGridHeader?: (model: IGridDateModel) => string;
    monthGridHeaderExceed?: (hiddenSchedules: number) => string;
    monthGridFooter?: (model: IGridDateModel) => string;
    monthGridFooterExceed?: (hiddenSchedules: number) => string;
    monthDayname?: (model: IMonthDayNameInfo) => string;
    weekDayname?: (model: IWeekDayNameInfo) => string;
    weekGridFooterExceed?: (hiddenSchedules: number) => string;
    dayGridTitle?: (viewName: string) => string;
    schedule?: (schedule: ISchedule) => string;
    collapseBtnTitle?: () => string;
    timezoneDisplayLabel?: (timezoneOffset: number, displayLabel: string) => string;
    timegridDisplayPrimayTime?: (time: ITimeGridHourLabel) => string;
    timegridDisplayPrimaryTime?: (time: ITimeGridHourLabel) => string;
    timegridDisplayTime?: (time: ITimeGridHourLabel) => string;
    timegridCurrentTime?: (hourMarker: ITimezoneHourMarker) => string;
    popupIsAllDay?: () => string;
    popupStateFree?: () => string;
    popupStateBusy?: () => string;
    titlePlaceholder?: () => string;
    locationPlaceholder?: () => string;
    startDatePlaceholder?: () => string;
    endDatePlaceholder?: () => string;
    popupSave?: () => string;
    popupUpdate?: () => string;
    popupDetailDate?: (isAllDay: boolean, start: DateType, end: DateType) => string;
    popupDetailLocation?: (schedule: ISchedule) => string;
    popupDetailUser?: (schedule: ISchedule) => string;
    popupDetailState?: (schedule: ISchedule) => string;
    popupDetailRepeat?: (schedule: ISchedule) => string;
    popupDetailBody?: (schedule: ISchedule) => string;
    popupEdit?: () => string;
    popupDelete?: () => string;
}

export interface IWeekOptions {
    startDayOfWeek?: number;
    daynames?: string[];
    narrowWeekend?: boolean;
    workweek?: boolean;
    showTimezoneCollapseButton?: boolean;
    timezonesCollapsed?: boolean;
    hourStart?: number;
    hourEnd?: number;
}

export interface IMonthOptions {
    daynames?: string[];
    startDayOfWeek?: number;
    narrowWeekend?: boolean;
    visibleWeeksCount?: number;
    isAlways6Week?: boolean;
    workweek?: boolean;
    visibleScheduleCount?: number;
    moreLayerSize?: {
        width?: string | null;
        height?: string | null;
    };
    grid?: {
        header?: {
            height?: number;
        },
        footer?: {
            height?: number;
        }
    };
    scheduleFilter?: (schedule: ISchedule) => boolean;
}

export interface ISchedule {
    id?: string;
    calendarId?: string;
    title?: string;
    body?: string;
    start?: DateType;
    end?: DateType;
    goingDuration?: number;
    comingDuration?: number;
    isAllDay?: boolean;
    category?: string;
    dueDateClass?: string;
    location?: string;
    attendees?: string[];
    recurrenceRule?: string;
    isPending?: boolean;
    isFocused?: boolean;
    isVisible?: boolean;
    isReadOnly?: boolean;
    isPrivate?: boolean;
    color?: string;
    bgColor?: string;
    dragBgColor?: string;
    borderColor?: string;
    customStyle?: string;
    raw?: {
      [propName: string]: string | number | boolean | object | null;
    }
    state?: string;
}

export interface ITimezone {
    timezoneName: string,
    displayLabel?: string;
    tooltip?: string;
    timezoneOffset?: number;
}

export interface ICalendarInfo {
    id: string;
    name: string;
    color?: string;
    bgColor?: string;
    dragBgColor?: string;
    borderColor?: string;
}

export interface ITheme {
    [k: string]: string;
}

export interface IOptions {
    defaultView?: string;
    taskView?: boolean | string[];
    scheduleView?: boolean | string[];
    theme?: ITheme;
    template?: ITemplateConfig;
    week?: IWeekOptions;
    month?: IMonthOptions;
    calendars?: ICalendarInfo[];
    useCreationPopup?: boolean;
    useDetailPopup?: boolean;
    timezones?: ITimezone[];
    timezone?: {
        zones: ITimezone[];
        offsetCalculator: (timezoneName: string, timestamp: number) => number;
    };
    disableDblClick?: boolean;
    disableClick?: boolean;
    isReadOnly?: boolean;
    usageStatistics?: boolean;
}

export default class Calendar {
    public static setTimezoneOffset(offset: number): void;
    public static setTimezoneOffsetCallback(callback: (timestamp: number) => void): void;

    constructor(container: Element | string, options?: IOptions);

    public changeView(newViewName: string, force?: boolean): void;
    public clear(immediately?: boolean): void;
    public createSchedules(schedules: ISchedule[], silent?: boolean): void;
    public deleteSchedule(scheduleId: string, calendarId: string, silent?: boolean): void;
    public destroy(): void;
    public getDate(): TZDate;
    public getDateRangeEnd(): TZDate;
    public getDateRangeStart(): TZDate;
    public getElement(scheduleId: string, calendarId: string): Element;
    public getOptions(): IOptions;
    public getSchedule(scheduleId: string, calendarId: string): ISchedule;
    public getViewName(): string;
    public hideMoreView(): void;
    public next(): void;
    public openCreationPopup(schedule: ISchedule): void;
    public prev(): void;
    public render(immediately?: boolean): void;
    public scrollToNow(): void;
    public setCalendarColor(calendarId: string, option: ICalendarColor, silent?: boolean): void;
    public setCalendars(calendars: ICalendarInfo[]): void;
    public setDate(date: Date | string): void;
    public setOptions(options: IOptions, silent?: boolean): void;
    public setTheme(theme: ITheme): string[];
    public today(): void;
    public toggleSchedules(calendarId: string, toHide: boolean, render?: boolean): void;
    public toggleScheduleView(enabled: boolean): void;
    public toggleTaskView(enabled: boolean): void;
    public updateSchedule(scheduleId: string, calendarId: string, scheduleData: ISchedule, silent?: boolean): void;
    public off(eventName?: string | object | EventHandlerType, handler?: EventHandlerType | string): void;
    public on(event: CustomEventType | IEvents, handler?: EventHandlerType): void;
}
