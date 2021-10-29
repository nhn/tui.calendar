import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { collidesWith } from '@src/util/events';

/**
 * Set of UI-related properties for calendar event.
 * @class
 * @param {Schedule} schedule Schedule instance.
 */
export default class EventUIModel {
  model: Schedule;

  top = 0;

  left = 0;

  width = 0;

  height = 0;

  /**
   * Represent schedule has collide with other schedules when rendering.
   * @type {boolean}
   */
  hasCollide = false;

  /**
   * Extra space at right side of this schedule.
   * @type {number}
   */
  extraSpace = 0;

  /**
   * represent this schedule block is not visible after rendered.
   *
   * in month view, some ui models in date need to hide when already rendered before dates.
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

  constructor(schedule: Schedule) {
    this.model = schedule;
  }

  /**
   * EventUIModel factory method.
   */
  static create(schedule: Schedule): EventUIModel {
    return new EventUIModel(schedule);
  }

  /**
   * return renderStarts property to render properly when specific schedule that exceed rendering date range.
   *
   * if renderStarts is not set. return model's start property.
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

  collidesWith(uiModel: Schedule | EventUIModel, usingTravelTime = true) {
    return collidesWith({
      start: this.getStarts().getTime(),
      end: this.getEnds().getTime(),
      targetStart: uiModel.getStarts().getTime(),
      targetEnd: uiModel.getEnds().getTime(),
      goingDuration: this.model.goingDuration,
      comingDuration: this.model.comingDuration,
      targetGoingDuration: uiModel.valueOf().goingDuration,
      targetComingDuration: uiModel.valueOf().comingDuration,
      usingTravelTime, // Daygrid does not use travelTime, TimeGrid uses travelTime.
    });
  }
}
