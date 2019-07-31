// Type definitions for TOAST UI Calendar v1.12.4
// TypeScript Version: 3.2.1

declare namespace tuiCalendar {
    type DateType = string | TZDate | Date;
    type AfterRenderScheduleEventHandlerFunc = (eventObj: {schedule: ISchedule}) => void;
    type BeforeCreateScheduleEventHandlerFunc = (schedule: ISchedule) => void;
    type BeforeDeleteScheduleEventHandlerFunc = (eventObj: IEventScheduleObject) => void;
    type BeforeUpdateScheduleEventHandlerFunc = (eventObj: IEventObject) => void;
    type ClickDayNameEventHandlerFunc = (eventObj: IEventDateObject) => void;
    type ClickMoreEventHandlerFunc = (eventObj: IEventMoreObject) => void;
    type ClickScheduleEventHandlerFunc = (eventObj: IEventScheduleObject) => void;
    type TimezonesCollapseEventFunc = (timezonesCollapsed: boolean) => void;
    type EventHandlerType = AfterRenderScheduleEventHandlerFunc |
        BeforeCreateScheduleEventHandlerFunc |
        BeforeDeleteScheduleEventHandlerFunc |
        BeforeUpdateScheduleEventHandlerFunc |
        ClickDayNameEventHandlerFunc |
        ClickMoreEventHandlerFunc |
        ClickScheduleEventHandlerFunc |
        TimezonesCollapseEventFunc;
    type CustomEventType = 'afterRenderSchedule' | 'beforeCreateSchedule' |
        'beforeDeleteSchedule' | 'beforeUpdateSchedule' | 'clickDayname' |
        'clickMore' | 'clickSchedule' | 'clickTimezonesCollapseBtn';

    interface IEventObject {
        schedule: ISchedule;
        end: TZDate;
        start: TZDate;
        calendar?: ICalendarInfo;
        triggerEventName?: string;
    }

    interface IEventDateObject {
        date: string;
    }

    interface IEventMoreObject {
        date: TZDate;
        target: Element;
    }

    interface IEventScheduleObject {
        calendar: ICalendarInfo;
        event: MouseEvent;
        schedule: ISchedule;

    }
    interface IEvents {
        'afterRenderSchedule'?: AfterRenderScheduleEventHandlerFunc;
        'beforeCreateSchedule'?: BeforeCreateScheduleEventHandlerFunc;
        'beforeDeleteSchedule'?: BeforeDeleteScheduleEventHandlerFunc;
        'beforeUpdateSchedule'?: BeforeUpdateScheduleEventHandlerFunc;
        'clickDayname'?: ClickDayNameEventHandlerFunc;
        'clickMore'?: ClickMoreEventHandlerFunc;
        'clickSchedule'?: ClickScheduleEventHandlerFunc;
        'clickTimezonesCollapseBtn'?: TimezonesCollapseEventFunc;
    }

    class TZDate {
        public getTime(): number;
        public toDate(): Date;
        public toUTCString(): Date;
    }

    interface ICalendarColor {
        color?: string;
        bgColor?: string;
        dragBgColor?: string;
        borderColor?: string;
    }

    interface ITimeGridHourLabel {
        hidden: boolean;
        hour: number;
        minutes: number;
    }

    interface ITimezoneHourMarker {
        hourmarker: TZDate;
        dateDifferenceSign: string;
        dateDifference: number;
    }

    interface IGridDateModel {
        date: string;
        day: number;
        hiddenSchedules: number;
        isOtherMonth: boolean;
        isToday: boolean;
        month: number;
        ymd: string;
    }

    interface IWeekDayNameInfo {
        date: number;
        day: number;
        dayName: string;
        isToday: boolean;
        renderDate: string;
    }

    interface IMonthDayNameInfo {
        day: number;
        label: string;
    }

    interface ITemplateConfig {
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

    interface IWeekOptions {
        startDayOfWeek?: number;
        daynames?: string[];
        narrowWeekend?: boolean;
        workweek?: boolean;
        showTimezoneCollapseButton?: boolean;
        timezoneCollapsed?: boolean;
        hourStart?: number;
        hourEnd?: number;
    }

    interface IMonthOptions {
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

    interface IRaw {
        [propName: string]: string | number | boolean | object | null;
    }

    interface ISchedule {
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
        raw?: any;
        state?: string;
    }

    interface ITimezone {
        timezoneOffset?: number;
        displayLabel?: string;
        tooltip?: string;
    }

    interface ICalendarInfo {
        id: string;
        name: string;
        color?: string;
        bgColor?: string;
        dragBgColor?: string;
        borderColor?: string;
    }

    interface IOptions {
        defaultView?: string;
        taskView?: boolean | string[];
        scheduleView?: boolean | string[];
        theme?: object;
        template?: ITemplateConfig;
        week?: IWeekOptions;
        month?: IMonthOptions;
        calendars?: Calendar[];
        useCreationPopup?: boolean;
        useDetailPopup?: boolean;
        timezones?: ITimezone[];
        disableDblClick?: boolean;
        disableClick?: boolean;
        isReadOnly?: boolean;
        usageStatistics?: boolean;
    }

    class Calendar {
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
        public setTheme(theme: object): string[];
        public today(): void;
        public toggleSchedules(calendarId: string, toHide: boolean, render?: boolean): void;
        public toggleScheduleView(enabled: boolean): void;
        public toggleTaskView(enabled: boolean): void;
        public updateSchedule(scheduleId: string, calendarId: string, scheduleData: ISchedule, silent?: boolean): void;
        public off(eventName?: string | object | EventHandlerType, handler?: EventHandlerType | string): void;
        public on(event: CustomEventType | IEvents, handler?: EventHandlerType): void;
    }
}
declare module 'tui-calendar' {
    export default tuiCalendar.Calendar;
}
