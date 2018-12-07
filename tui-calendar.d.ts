// Type definitions for tui.calendar v1.8.0
// TypeScript Version: 3.2

declare class TZDate {
    getTime(): number;
    toDate(): Date;
    toUTCString(): Date;
}

interface CalendarColor {
    color?: string;
    bgColor?: string;
    dragBgColor?: string;
    borderColor?: string;
}

interface ThemeConfig {
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

interface TemplateConfig {
    milestoneTitle?: () => string;
    milestone?: (schedule: Schedule) => string;
    taskTitle?: () => string;
    task?: (schedule: Schedule) => string;
    alldayTitle?: () => string;
    allday?: (schedule: Schedule) => string;
    time?: (schedule: Schedule) => string;
    monthMoreTitleDate?: (date: any) => string;
    monthMoreClose?: () => string;
    monthGridHeader?: (model: object) => string;
    monthGridFooter?: () => string;
    monthGridHeaderExceed?: (hiddenSchedules?: string) => string;
    monthGridFooterExceed?: (hiddenSchedules?: string) => string;
    weekDayname?: (dayname: object) => string;
    monthDayname?: (dayname: object) => string;
}

interface WeekOptions {
    startDayOfWeek?: number;
    daynames?: Array<string>;
    narrowWeekend?: boolean;
    workweek?: boolean;
    showTimezoneCollapseButton?: boolean;
    timezoneCollapsed?: boolean;
    hourStart?: number;
    hourEnd?: number;
}

interface MonthOptions {
    daynames?: Array<string>;
    startDayOfWeek?: number;
    narrowWeekend?: boolean;
    visibleWeeksCount?: boolean;
    isAlways6Week?: boolean;
    workweek?: boolean;
    visibleScheduleCount?: number;
    moreLayerSize?: {
        width?: string | null,
        height?: string | null
    };
    grid?: {
        header?: {
            height?: number
        },
        footer?: {
            height?: number
        }
    };
    scheduleFilter?: (...args:Array<any>) => any;
}

interface Schedule {
    id: string;
    calendarId: string;
    title: string;
    start: string | TZDate;
    end: string | TZDate;
    goingDuration?: number;
    comingDuration?: number;
    isAllDay?: boolean;
    category: string;
    dueDateClass?: string;
    location?: string;
    attendees?: Array<string>;
    recurrenceRule?: any;
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

interface Timezone {
    timezoneOffset?: number;
    displayLabel?: string;
    tooltip?: string;
}

interface CalendarInfo {
    id: string;
    name: string;
    color?: string;
    bgColor?: string;
    dragBgColor?: string;
    borderColor?: string;
}

interface Options {
    defaultView?: string;
    taskView?: boolean | Array<string>;
    scheduleView?: boolean | Array<string>;
    theme?: ThemeConfig;
    template?: TemplateConfig;
    week?: WeekOptions;
    month?: MonthOptions;
    calendars?: Array<Calendar>;
    useCreationPopup?: boolean;
    useDetailPopup?: boolean;
    timezones?: Array<Timezone>;
    disableDblClick?: boolean;
    isReadOnly?: boolean;
}

declare class Calendar {
    constructor(container: Element | string, options?: Options);

    static setTimezoneOffset(offset: number): void;
    static setTimezoneOffsetCallback(callback: (...args: Array<any>) => any):void;

    changeView(newViewName: string, force?: boolean): void;
    clear(immediately?: boolean): void;
    createSchedules(schedules: Array<Schedule>, silent?: boolean): void;
    deleteSchedule(scheduleId: string, calendarId: string, silent?: boolean): void;
    destroy(): void;
    getDate(): TZDate;
    getDateRangeEnd(): TZDate;
    getDateRangeStart(): TZDate;
    getElement(scheduleId: string, calendarId:string): Element;
    getOptions(): Options;
    getSchedule(scheduleId: string, calendarId: string): Schedule;
    getViewName(): string;
    hideMoreView(): void;
    next(): void;
    openCreationPopup(schedule: Schedule): void;
    prev(): void;
    render(immediately?: boolean): void;
    scrollToNow(): void;
    setCalendarColor(calendarId: string, option: CalendarColor, silent?: boolean): void;
    setCalendars(calendars: Array<CalendarInfo>): void;
    setDate(date: Date | string): void;
    setOptions(options: any, silent?: boolean): void;
    setTheme(theme: ThemeConfig): Array<string>;
    today(): void;
    toggleSchedules(calendarId: string, toHide: boolean, render?: boolean): void;
    toggleScheduleView(enabled: boolean): void;
    toggleTaskView(enabled: boolean): void;
    updateSchedule(scheduleId: string, calendarId: string, scheduleData: any, silent?: boolean): void;
    on(...arg: Array<any>): void;
    off(...arg: Array<any>): void;
}

declare module "tui-calendar" {
    export = Calendar;
}
