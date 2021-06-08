import { h } from 'preact';
import isUndefined from 'tui-code-snippet/type/isUndefined';

import { cls } from '@src/util/cssHelper';
import { stripTags } from '@src/util';
import { leadingZero, toFormat, isSameDate } from '@src/time/datetime';
import Schedule, { ScheduleCategory } from '@src/model/schedule';
import {
  TemplateMonthGrid,
  TemplateMonthDayName,
  TemplateWeekDay,
  Template,
  TemplateCurrentTime,
  TemplateTimezone,
  TemplateMoreTitleDate,
} from '@src/model';
import TZDate from '@src/time/date';
import { capitalizeDayName, getDayName } from '@src/util/dayName';

const SIXTY_MINUTES = 60;

export const templates: Template = {
  milestone(model: Schedule) {
    const icon = cls('icon');
    const iconName = cls('ic-milestone');

    return `<span class="${icon} ${iconName}"></span><span style="background-color: ${
      model.bgColor
    }">${stripTags(model.title)}</span>`;
  },

  milestoneTitle() {
    return <span className={cls('left-content')}>Milestone</span>;
  },

  task(model: Schedule) {
    return `#${model.title}`;
  },

  taskTitle() {
    return <span className={cls('left-content')}>Task</span>;
  },

  alldayTitle() {
    return <span className={cls('left-content')}>All Day</span>;
  },

  allday(model: Schedule) {
    return stripTags(model.title);
  },

  time(model: Schedule) {
    const { start, title } = model;

    if (start) {
      return (
        <span>
          <strong>{toFormat(start, 'HH:mm')}</strong>&nbsp;<span>{stripTags(title)}</span>
        </span>
      );
    }

    return stripTags(title);
  },

  goingDuration(model: Schedule) {
    const { goingDuration } = model;
    const hour = Math.floor(goingDuration / SIXTY_MINUTES);
    const minutes = goingDuration % SIXTY_MINUTES;

    return `GoingTime ${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },

  comingDuration(model: Schedule) {
    const { comingDuration } = model;
    const hour = Math.floor(comingDuration / SIXTY_MINUTES);
    const minutes = comingDuration % SIXTY_MINUTES;

    return `ComingTime ${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },

  monthMoreTitleDate(moreTitle: TemplateMoreTitleDate) {
    const { date, day } = moreTitle;

    const classNameDay = cls('more-title-date');
    const classNameDayLabel = cls('more-title-day');
    const dayName = capitalizeDayName(getDayName(day));

    return `<span class="${classNameDay}">${date}</span><span class="${classNameDayLabel}">${dayName}</span>`;
  },

  monthMoreClose() {
    return '';
  },

  monthGridHeader(model: TemplateMonthGrid) {
    const date = parseInt(model.date.split('-')[2], 10);
    const classNames = [cls('weekday-grid-date')];

    if (model.isToday) {
      classNames.push(cls('weekday-grid-date-decorator'));
    }

    return <span className={classNames.join(' ')}>{date}</span>;
  },

  monthGridHeaderExceed(hiddenSchedules: number) {
    const className = cls('weekday-grid-more-schedules');

    return <span className={className}>{hiddenSchedules} more</span>;
  },

  monthGridFooter(model: TemplateMonthGrid) {
    return '';
  },

  monthGridFooterExceed(hiddenSchedules: number) {
    return '';
  },

  monthDayname(model: TemplateMonthDayName) {
    return model.label;
  },

  weekDayname(model: TemplateWeekDay) {
    const classDate = cls('dayname-date');
    const className = cls('dayname-name');

    return `<span class="${classDate}">${model.date}</span>&nbsp;&nbsp;<span class="${className}">${model.dayName}</span>`;
  },

  weekGridFooterExceed(hiddenSchedules: number) {
    return `+${hiddenSchedules}`;
  },

  dayGridTitle(viewName: ScheduleCategory) {
    if (viewName === 'milestone') {
      return templates.milestoneTitle();
    }

    if (viewName === 'task') {
      return templates.taskTitle();
    }

    if (viewName === 'allday') {
      return templates.alldayTitle();
    }

    return viewName;
  },

  schedule(model: Schedule) {
    const { category } = model;
    if (category === 'milestone') {
      return templates.milestone(model);
    }

    if (category === 'task') {
      return templates.task(model);
    }

    if (category === 'allday') {
      return templates.allday(model);
    }

    if (category === 'time') {
      return templates.time(model);
    }

    return model.title;
  },

  collapseBtnTitle() {
    const iconName = cls('icon');
    const closeIconName = cls('ic-arrow-solid-top');

    return <span className={`${iconName} ${closeIconName}`}></span>;
  },

  timezoneDisplayLabel(props: TemplateTimezone) {
    let { displayLabel = '' } = props;

    if (isUndefined(displayLabel)) {
      const { timezoneOffset } = props;
      const gmt = timezoneOffset < 0 ? '-' : '+';
      const hours = Math.abs(timezoneOffset / SIXTY_MINUTES);
      const minutes = Math.abs(timezoneOffset % SIXTY_MINUTES);
      displayLabel = `${gmt}${leadingZero(hours, 2)}:${leadingZero(minutes, 2)}`;
    }

    return displayLabel;
  },

  timegridDisplayPrimaryTime(props: TemplateCurrentTime) {
    const { time } = props;

    return toFormat(time, 'hh tt');
  },

  timegridDisplayTime(props: TemplateCurrentTime) {
    const { time } = props;
    const hour = time.getHours();
    const minutes = time.getMinutes();

    return `${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },

  timegridCurrentTime(timezone: TemplateCurrentTime) {
    const { time, format = 'HH:mm' } = timezone;

    return toFormat(time, format);
  },

  popupIsAllDay() {
    return 'All day';
  },

  popupStateFree() {
    return 'Free';
  },

  popupStateBusy() {
    return 'Busy';
  },

  titlePlaceholder() {
    return 'Subject';
  },

  locationPlaceholder() {
    return 'Location';
  },

  startDatePlaceholder() {
    return 'Start date';
  },

  endDatePlaceholder() {
    return 'End date';
  },

  popupSave() {
    return 'Save';
  },

  popupUpdate() {
    return 'Update';
  },

  popupEdit() {
    return 'Edit';
  },

  popupDelete() {
    return 'Delete';
  },

  popupDetailDate(isAllDay: boolean, start: TZDate, end: TZDate) {
    const isSame = isSameDate(start, end);
    const endFormat = `${isSame ? '' : 'YYYY.MM.DD '}hh:mm tt`;

    if (isAllDay) {
      return `${toFormat(start, 'YYYY.MM.DD')}${isSame ? '' : ` - ${toFormat(end, 'YYYY.MM.DD')}`}`;
    }

    return `${toFormat(start, 'YYYY.MM.DD hh:mm tt')} - ${toFormat(end, endFormat)}`;
  },

  popupDetailLocation({ location }) {
    return location;
  },

  popupDetailUser({ attendees = [] }) {
    return attendees.join(', ');
  },

  popupDetailState({ state }) {
    return state || 'Busy';
  },

  popupDetailRepeat({ recurrenceRule }) {
    return recurrenceRule;
  },

  popupDetailBody({ body }) {
    return body;
  },
};

export type TemplateName = keyof Template;
