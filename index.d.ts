// Type definitions for TOAST UI Calendar v1.9.0
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

    interface IThemeConfig {
        'common.border'?: string;
        'common.backgroundColor'?: string;
        'common.holiday.color'?: string;
        'common.saturday.color'?: string;
        'common.dayname.color'?: string;
        'common.today.color'?: string;

        // creation guide style
        'common.creationGuide.backgroundColor'?: string;
        'common.creationGuide.border'?: string;

        // month header 'dayname'
        'month.dayname.height'?: string;
        'month.dayname.borderLeft'?: string;
        'month.dayname.paddingLeft'?: string;
        'month.dayname.paddingRight'?: string;
        'month.dayname.backgroundColor'?: string;
        'month.dayname.fontSize'?: string;
        'month.dayname.fontWeight'?: string;
        'month.dayname.textAlign'?: string;

        // month day grid cell 'day'
        'month.holidayExceptThisMonth.color'?: string;
        'month.dayExceptThisMonth.color'?: string;
        'month.weekend.backgroundColor'?: string;
        'month.day.fontSize'?: string;

        // month schedule style
        'month.schedule.borderRadius'?: string;
        'month.schedule.height'?: string;
        'month.schedule.marginTop'?: string;
        'month.schedule.marginLeft'?: string;
        'month.schedule.marginRight'?: string;

        // month more view
        'month.moreView.border'?: string;
        'month.moreView.boxShadow'?: string;
        'month.moreView.backgroundColor'?: string;
        'month.moreView.paddingBottom'?: string;
        'month.moreViewTitle.height'?: string;
        'month.moreViewTitle.marginBottom'?: string;
        'month.moreViewTitle.backgroundColor'?: string;
        'month.moreViewTitle.borderBottom'?: string;
        'month.moreViewTitle.padding'?: string;
        'month.moreViewList.padding'?: string;

        // week header 'dayname'
        'week.dayname.height'?: string;
        'week.dayname.borderTop'?: string;
        'week.dayname.borderBottom'?: string;
        'week.dayname.borderLeft'?: string;
        'week.dayname.paddingLeft'?: string;
        'week.dayname.backgroundColor'?: string;
        'week.dayname.textAlign'?: string;
        'week.today.color'?: string;

        // week vertical panel 'vpanel'
        'week.vpanelSplitter.border'?: string;
        'week.vpanelSplitter.height'?: string;

        // week daygrid 'daygrid'
        'week.daygrid.borderRight'?: string;
        'week.daygrid.backgroundColor'?: string;

        'week.daygridLeft.width'?: string;
        'week.daygridLeft.backgroundColor'?: string;
        'week.daygridLeft.paddingRight'?: string;
        'week.daygridLeft.borderRight'?: string;

        'week.today.backgroundColor'?: string;
        'week.weekend.backgroundColor'?: string;

        // week timegrid 'timegrid'
        'week.timegridLeft.width'?: string;
        'week.timegridLeft.backgroundColor'?: string;
        'week.timegridLeft.borderRight'?: string;
        'week.timegridLeft.fontSize'?: string;
        'week.timegridLeftTimezoneLabel.height'?: string;

        'week.timegridOneHour.height'?: string;
        'week.timegridHalfHour.height'?: string;
        'week.timegridHalfHour.borderBottom'?: string;
        'week.timegridHorizontalLine.borderBottom'?: string;

        'week.timegrid.paddingRight'?: string;
        'week.timegrid.borderRight'?: string;
        'week.timegridSchedule.borderRadius'?: string;
        'week.timegridSchedule.paddingLeft'?: string;

        'week.currentTime.color'?: string;
        'week.currentTime.fontSize'?: string;
        'week.currentTime.fontWeight'?: string;

        'week.pastTime.color'?: string;
        'week.pastTime.fontWeight'?: string;

        'week.futureTime.color'?: string;
        'week.futureTime.fontWeight'?: string;

        'week.currentTimeLinePast.border'?: string;
        'week.currentTimeLineBullet.backgroundColor'?: string;
        'week.currentTimeLineToday.border'?: string;
        'week.currentTimeLineFuture.border'?: string;

        // week creation guide style
        'week.creationGuide.color'?: string;
        'week.creationGuide.fontSize'?: string;
        'week.creationGuide.fontWeight'?: string;

        // week daygrid schedule style
        'week.dayGridSchedule.borderRadius'?: string;
        'week.dayGridSchedule.height'?: string;
        'week.dayGridSchedule.marginTop'?: string;
        'week.dayGridSchedule.marginLeft'?: string;
        'week.dayGridSchedule.marginRight'?: string;
    }

    interface ITimeGridHourLabel {
        hidden: boolean;
        hour: number;
        minutes: number;
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
        weekDayname?: (model: IWeekDayNameInfo) => string;
        monthDayname?: (model: IMonthDayNameInfo) => string;
        weekGridFooterExceed?: (hiddenSchedules: number) => string;
        dayGridTitle?: (viewName: string) => string;
        schedule?: (schedule: ISchedule) => string;
        collapseBtnTitle?: () => string;
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
        timezoneDisplayLabel?: (timezoneOffset: number, displayLabel: string) => string;
        timegridDisplayPrimayTime?: (time: ITimeGridHourLabel) => string;
        timegridDisplayTime?: (time: ITimeGridHourLabel) => string;
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
        visibleWeeksCount?: boolean;
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
        checked?: boolean;
    }

    interface IOptions {
        defaultView?: string;
        taskView?: boolean | string[];
        scheduleView?: boolean | string[];
        theme?: IThemeConfig;
        template?: ITemplateConfig;
        week?: IWeekOptions;
        month?: IMonthOptions;
        calendars?: Calendar[];
        useCreationPopup?: boolean;
        useDetailPopup?: boolean;
        timezones?: ITimezone[];
        disableDblClick?: boolean;
        isReadOnly?: boolean;
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
        public setTheme(theme: IThemeConfig): string[];
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
    export = tuiCalendar.Calendar;
}
