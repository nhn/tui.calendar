/**
 * @fileoverview Model for views
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { millisecondsFrom } from '@src/time/datetime';
import { collidesWith } from '@src/util/events';

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
   * represent render start date used at rendering.
   *
   * if set null then use model's 'start' property.
   * @type {TZDate}
   */
  renderStarts?: TZDate;

  /**
   * represent render end date used at rendering.
   *
   * if set null then use model's 'end' property.
   * @type {TZDate}
   */
  renderEnds?: TZDate;

  /**
   * whether the actual start-date is before the render-start-date
   * @type {boolean}
   */
  exceedLeft = false;

  /**
   * whether the actual end-date is after the render-end-date
   * @type {boolean}
   */
  exceedRight = false;

  /**
   * whether the actual start-date is before the render-start-date for column
   * @type {boolean}
   */
  croppedStart = false;

  /**
   * whether the actual end-date is after the render-end-date for column
   * @type {boolean}
   */
  croppedEnd = false;

  /**
   * @type {number} percent
   */
  goingDurationHeight = 0;

  /**
   * @type {number} percent
   */
  modelDurationHeight = 100;

  /**
   * @type {number} percent
   */
  comingDurationHeight = 0;

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
  cid() {
    return this.model.cid();
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
  duration() {
    return this.model.duration();
  }

  collidesWith(viewModel: Schedule | ScheduleViewModel) {
    return collidesWith({
      start: this.getStarts().getTime(),
      end: this.getEnds().getTime(),
      targetStart: viewModel.getStarts().getTime(),
      targetEnd: viewModel.getEnds().getTime(),
      goingDuration: this.model.goingDuration,
      comingDuration: this.model.comingDuration,
      targetGoingDuration: viewModel.valueOf().goingDuration,
      targetComingDuration: viewModel.valueOf().comingDuration,
    });
  }
}
