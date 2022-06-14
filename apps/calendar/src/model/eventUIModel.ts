import { collidesWith } from '@src/helpers/events';
import type EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';
import { pick } from '@src/utils/object';

interface EventUIProps {
  top: number;
  left: number;
  width: number;
  height: number;
  hasCollide: boolean;
  extraSpace: number;
  hidden: boolean;
  exceedLeft: boolean;
  exceedRight: boolean;
  croppedStart: boolean;
  croppedEnd: boolean;
  goingDurationHeight: number;
  modelDurationHeight: number;
  comingDurationHeight: number;
}

const eventUIPropsKey: (keyof EventUIProps)[] = [
  'top',
  'left',
  'width',
  'height',
  'hasCollide',
  'extraSpace',
  'hidden',
  'exceedLeft',
  'exceedRight',
  'croppedStart',
  'croppedEnd',
  'goingDurationHeight',
  'modelDurationHeight',
  'comingDurationHeight',
];

/**
 * Set of UI-related properties for calendar event.
 * @class
 * @param {EventModel} event EventModel instance.
 */
export default class EventUIModel implements EventUIProps {
  model: EventModel;

  top = 0;

  left = 0;

  width = 0;

  height = 0;

  /**
   * Represent event has collide with other events when rendering.
   * @type {boolean}
   */
  hasCollide = false;

  /**
   * Extra space at right side of this event.
   * @type {number}
   */
  extraSpace = 0;

  /**
   * represent this event block is not visible after rendered.
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

  constructor(event: EventModel) {
    this.model = event;
  }

  getUIProps(): EventUIProps {
    return pick(this, ...eventUIPropsKey);
  }

  setUIProps(props: Partial<EventUIProps>) {
    Object.assign(this, props);
  }

  /**
   * return renderStarts property to render properly when specific event that exceed rendering date range.
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
   * return renderStarts property to render properly when specific event that exceed rendering date range.
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
   * Shadowing valueOf method for event sorting.
   */
  valueOf(): EventModel {
    return this.model;
  }

  /**
   * Link duration method
   * @returns {number} EventModel#duration result.
   */
  duration() {
    return this.model.duration();
  }

  collidesWith(uiModel: EventModel | EventUIModel, usingTravelTime = true) {
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

  clone() {
    const eventUIModelProps = this.getUIProps();
    const clonedEventUIModel = new EventUIModel(this.model);
    clonedEventUIModel.setUIProps(eventUIModelProps);

    if (this.renderStarts) {
      clonedEventUIModel.renderStarts = new TZDate(this.renderStarts);
    }

    if (this.renderEnds) {
      clonedEventUIModel.renderEnds = new TZDate(this.renderEnds);
    }

    return clonedEventUIModel;
  }
}
