import { collidesWith } from '@src/helpers/events';
import type EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';
import { pick } from '@src/utils/object';

interface EventUIProps {
  top: number;
  left: number;
  width: number;
  height: number;
  exceedLeft: boolean;
  exceedRight: boolean;
  croppedStart: boolean;
  croppedEnd: boolean;
  goingDurationHeight: number;
  modelDurationHeight: number;
  comingDurationHeight: number;
  duplicateEvents: EventUIModel[];
  duplicateStarts?: TZDate;
  duplicateEnds?: TZDate;
  collapse: boolean;
  isMain: boolean;
}

const eventUIPropsKey: (keyof EventUIProps)[] = [
  'top',
  'left',
  'width',
  'height',
  'exceedLeft',
  'exceedRight',
  'croppedStart',
  'croppedEnd',
  'goingDurationHeight',
  'modelDurationHeight',
  'comingDurationHeight',
  'duplicateEvents',
  'duplicateStarts',
  'duplicateEnds',
  'collapse',
  'isMain',
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
   * the sorted list of duplicate events.
   * @type {EventUIModel[]}
   */
  duplicateEvents: EventUIModel[] = [];

  /**
   * represent the start date of a group of duplicate events.
   *
   * the earliest value among the duplicate events' starts and going durations.
   * @type {TZDate}
   */
  duplicateStarts?: TZDate;

  /**
   * represent the end date of a group of duplicate events.
   *
   * the latest value among the duplicate events' ends and coming durations.
   * @type {TZDate}
   */
  duplicateEnds?: TZDate;

  /**
   * whether the event is collapsed or not among the duplicate events.
   * @type {boolean}
   */
  collapse = false;

  /**
   * whether the event is main or not.
   * The main event is expanded on the initial rendering.
   * @type {boolean}
   */
  isMain = false;

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
    const infos: { start: TZDate; end: TZDate; goingDuration: number; comingDuration: number }[] =
      [];
    [this, uiModel].forEach((event) => {
      const isDuplicateEvent = event instanceof EventUIModel && event.duplicateEvents.length > 0;

      if (isDuplicateEvent) {
        infos.push({
          start: event.duplicateStarts as TZDate,
          end: event.duplicateEnds as TZDate,
          goingDuration: 0,
          comingDuration: 0,
        });
      } else {
        infos.push({
          start: event.getStarts(),
          end: event.getEnds(),
          goingDuration: event.valueOf().goingDuration,
          comingDuration: event.valueOf().comingDuration,
        });
      }
    });
    const [thisInfo, targetInfo] = infos;

    return collidesWith({
      start: thisInfo.start.getTime(),
      end: thisInfo.end.getTime(),
      targetStart: targetInfo.start.getTime(),
      targetEnd: targetInfo.end.getTime(),
      goingDuration: thisInfo.goingDuration,
      comingDuration: thisInfo.comingDuration,
      targetGoingDuration: targetInfo.goingDuration,
      targetComingDuration: targetInfo.comingDuration,
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
