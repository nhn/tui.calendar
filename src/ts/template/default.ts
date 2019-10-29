import pick from 'tui-code-snippet/object/pick';
import isUndefined from 'tui-code-snippet/type/isUndefined';

import { classname } from '@src/util/cssHelper';
import { stripTags } from '@src/util';
import { leadingZero, format, isSameDate } from '@src/time/datetime';
import Schedule, { ScheduleCategory } from '@src/model/schedule';
import {
  TemplateMonthGrid,
  TemplateMonthDayName,
  TemplateWeekDay,
  Template,
  TemplateTimeGridHourLabel,
  TemplateTimezoneHourMarker
} from '@src/model';
import TZDate from '@src/time/date';

const SIXTY_MINUTES = 60;

export const templates: Template = {
  milestone(model: Schedule) {
    const icon = classname('icon');
    const iconName = classname('ic-milestone');

    return `<span class="${icon} ${iconName}"></span>
      <span style="background-color: ${model.bgColor}">${stripTags(model.title)}</span>`;
  },

  milestoneTitle() {
    return `<span class="${classname('left-content')}">Milestone</span>`;
  },

  task(model: Schedule) {
    return `#${model.title}`;
  },

  taskTitle() {
    return `<span class="${classname('left-content')}">Task</span>`;
  },

  alldayTitle() {
    return `<span class="${classname('left-content')}">All Day</span>`;
  },

  allday(model: Schedule) {
    return stripTags(model.title);
  },

  time(model: Schedule) {
    return stripTags(model.title);
  },

  goingDuration(model: Schedule) {
    const { goingDuration } = model;
    const hour = goingDuration / SIXTY_MINUTES;
    const minutes = goingDuration % SIXTY_MINUTES;

    return `GoingTime ${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },

  comingDuration(model: Schedule) {
    const { comingDuration } = model;
    const hour = comingDuration / SIXTY_MINUTES;
    const minutes = comingDuration % SIXTY_MINUTES;

    return `ComingTime ${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },

  monthMoreTitleDate(date: string, dayname: string) {
    const classDay = classname('month-more-title-day');
    const classDayLabel = classname('month-more-title-day-label');
    const day = pick(date.split('.'), 2);

    return `<span class="${classDay}">${day}</span><span class="${classDayLabel}">${dayname}</span>`;
  },

  monthMoreClose() {
    return '';
  },

  monthGridHeader(model: TemplateMonthGrid) {
    const date = parseInt(model.date.split('-')[2], 10);
    const classNames = [classname('weekday-grid-date')];

    if (model.isToday) {
      classNames.push(classname('weekday-grid-date-decorator'));
    }

    return `<span class="${classNames.join(' ')}">${date}</span>`;
  },

  monthGridHeaderExceed(hiddenSchedules: number) {
    const className = classname('weekday-grid-more-schedules');

    return `<span class="${className}">${hiddenSchedules} more</span>`;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  monthGridFooter(model: TemplateMonthGrid) {
    return '';
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  monthGridFooterExceed(hiddenSchedules: number) {
    return '';
  },

  monthDayname(model: TemplateMonthDayName) {
    return model.label;
  },

  weekDayname(model: TemplateWeekDay) {
    const classDate = classname('dayname-date');
    const className = classname('dayname-name');

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
    const iconName = classname('icon');
    const closeIconName = classname('ic-arrow-solid-top');

    return `<span class="${iconName} ${closeIconName}"></span>`;
  },

  timezoneDisplayLabel(timezoneOffset: number, displayLabel: string) {
    let label = displayLabel;

    if (isUndefined(label)) {
      const gmt = timezoneOffset < 0 ? '-' : '+';
      const hour = Math.abs(timezoneOffset / SIXTY_MINUTES);
      const minutes = Math.abs(timezoneOffset % SIXTY_MINUTES);
      label = `${gmt}${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
    }

    return label;
  },

  timegridDisplayPrimaryTime(time: TemplateTimeGridHourLabel) {
    let { hour } = time;
    const meridiem = hour >= 12 ? 'pm' : 'am';

    if (hour > 12) {
      hour = hour - 12;
    }

    return `${hour} ${meridiem}`;
  },

  timegridDisplayTime(time: TemplateTimeGridHourLabel) {
    return `${leadingZero(time.hour, 2)}:${leadingZero(time.minutes, 2)}`;
  },

  timegridCurrentTime(timezone: TemplateTimezoneHourMarker) {
    const now = [];

    if (timezone.dateDifference) {
      now.push(`[${timezone.dateDifferenceSign + timezone.dateDifference}]<br>`);
    }

    now.push(format(timezone.hourmarker, 'HH:mm'));

    return now.join('');
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
      return `${format(start, 'YYYY.MM.DD')}${isSame ? '' : ` - ${format(end, 'YYYY.MM.DD')}`}`;
    }

    return `${format(start, 'YYYY.MM.DD hh:mm tt')} - ${format(end, endFormat)}`;
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
  }
};
