/**
 * @fileoverview Model for views
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import { stamp } from '@src/util';
import * as datetime from '@src/time/datetime';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';

const SCHEDULE_MIN_DURATION = datetime.MILLISECONDS_SCHEDULE_MIN_DURATION;

/**
 * Schedule ViewModel
 * @class
 * @param {Schedule} schedule Schedule instance.
 */
export default class ScheduleViewModel {
  /**
   * The model of schedule.
   * @type {Schedule}
   */
  model: Schedule;

  /**
   * @type {number}
   */
  top = 0;

  /**
   * @type {number}
   */
  left = 0;

  /**
   * @type {number}
   */
  width = 0;

  /**
   * @type {number}
   */
  height = 0;

  /**
   * Represent schedule has collide with other schedules when rendering.
   * @type {boolean}
   */
  hasCollide = false;

  /**
   * Extra space at rigth side of this schedule.
   * @type {number}
   */
  extraSpace = 0;

  /**
   * represent this schedule block is not visible after rendered.
   *
   * in month view, some viewmodel in date need to hide when already rendered before dates.
   *
   * set true then it just shows empty space.
   * @type {boolean}
   */
  hidden = false;

  /**
   * whether the schedule includes multiple dates
   */
  hasMultiDates = false;

  /**
   * represent render start date used at rendering.
   *
   * if set null then use model's 'start' property.
   * @type {TZDate}
   */
  renderStarts?: TZDate;

  /**
   * whether the actual start-date is before the render-start-date
   * @type {boolean}
   */
  exceedLeft = false;

  /**
   * represent render end date used at rendering.
   *
   * if set null then use model's 'end' property.
   * @type {TZDate}
   */
  renderEnds?: TZDate;

  /**
   * whether the actual end-date is after the render-end-date
   * @type {boolean}
   */
  exceedRight = false;

  /**
   * Schedule ViewModel
   * @param {Schedule} schedule Schedule instance.
   */
  constructor(schedule: Schedule) {
    this.model = schedule;
  }

  /**
   * ScheduleViewModel factory method.
   * @param {Schedule} schedule Schedule instance.
   * @returns {ScheduleViewModel} ScheduleViewModel instance.
   */
  static create(schedule: Schedule): ScheduleViewModel {
    return new ScheduleViewModel(schedule);
  }

  /**
   * return renderStarts property to render properly when specific schedule that exceed rendering date range.
   *
   * if renderStarts is not set. return model's start property.
   * @override
   * @returns {TZDate} render start date.
   */
  getStarts(): TZDate {
    if (this.renderStarts) {
      return this.renderStarts;
    }

    return this.model.getStarts();
  }

  /**
   * return renderStarts property to render properly when specific schedule that exceed rendering date range.
   *
   * if renderEnds is not set. return model's end property.
   * @override
   * @returns {Date} render end date.
   */
  getEnds(): TZDate {
    if (this.renderEnds) {
      return this.renderEnds;
    }

    return this.model.getEnds();
  }

  /**
   * @returns {number} unique number for model.
   */
  cid(): number {
    return stamp(this.model);
  }

  /**
   * Shadowing valueOf method for schedule sorting.
   * @returns {Schedule} The model of schedule.
   */
  valueOf(): Schedule {
    return this.model;
  }

  /**
   * Link duration method
   * @returns {number} Schedule#duration result.
   */
  duration(): number {
    return this.model.duration();
  }

  /**
   * Link collidesWith method
   * @param {Schedule|ScheduleViewModel} viewModel - Model or viewmodel instance of Schedule.
   * @returns {boolean} Schedule#collidesWith result.
   */
  collidesWith(viewModel: ScheduleViewModel): boolean {
    let ownStarts = Number(this.getStarts());
    let ownEnds = Number(this.getEnds());
    let start = Number(viewModel.getStarts());
    let end = Number(viewModel.getEnds());
    const ownGoingDuration = datetime.millisecondsFrom('minutes', this.valueOf().goingDuration);
    const ownComingDuration = datetime.millisecondsFrom('minutes', this.valueOf().comingDuration);
    const goingDuration = datetime.millisecondsFrom('minutes', viewModel.valueOf().goingDuration);
    const comingDuration = datetime.millisecondsFrom('minutes', viewModel.valueOf().comingDuration);

    if (Math.abs(ownEnds - ownStarts) < SCHEDULE_MIN_DURATION) {
      ownEnds += SCHEDULE_MIN_DURATION;
    }

    if (Math.abs(end - start) < SCHEDULE_MIN_DURATION) {
      end += SCHEDULE_MIN_DURATION;
    }

    ownStarts -= ownGoingDuration;
    ownEnds += ownComingDuration;
    start -= goingDuration;
    end += comingDuration;

    if (
      (start > ownStarts && start < ownEnds) ||
      (end > ownStarts && end < ownEnds) ||
      (start <= ownStarts && end >= ownEnds)
    ) {
      return true;
    }

    return false;
  }
}
