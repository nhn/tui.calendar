import {HTMLAttributes, Component} from "react";

import TuiCalendar, {
  ISchedule,
  IEvents,
  IOptions
} from 'tui-calendar';


type EventNameMapping = {
  onAfterRenderSchedule: "afterRenderSchedule";
  onBeforeCreateSchedule: "beforeCreateSchedule";
  onBeforeDeleteSchedule: "beforeDeleteSchedule";
  onBeforeUpdateSchedule: "beforeUpdateSchedule";
  onClickDayname: "clickDayname";
  onClickMore: "clickMore";
  onClickSchedule: "clickSchedule";
  onClickTimezonesCollapseBtn: "clickTimezonesCollapseBtn";
};

type EventMaps = {
  [K in keyof EventNameMapping]?: IEvents[EventNameMapping[K]]
};

type Props = IOptions & EventMaps & {
  height: string;
  view?: string;
  schedules?: ISchedule[];
} & HTMLAttributes<HTMLElement>;

export default class Calendar extends Component<Props> {
  public getInstance(): TuiCalendar;
  public getRootElement(): HTMLElement;
}
