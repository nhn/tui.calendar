import { MonthOption, WeekOption } from '@src/model';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { template, options, dataStore, grid } from '@src/modules';
import { layerPopup, PopupType } from '@src/modules/layerPopup';
import Store from '@src/store';
import TZDate from '@src/time/date';
import { Options } from './option';

type InitStoreData = {
  options: Options;
};

type ActionParam = {
  type: string;
  payload?: any;
};

interface Action {
  [key: string]: ActionFunc;
}

type ActionFunc = (state: any, payload: any, store: Store) => any;

type StateFunc = (initStoreData: InitStoreData) => any;
type State = Record<string, any> | StateFunc;

interface StoreModule {
  name: string;
  state: State;
  actions?: Action;
}

type GetStateType<T> = T extends (...args: any) => infer R ? R : T;

interface PayloadActionsType {
  [key: string]: (payload: any) => any;
}

type ModuleKeys = keyof ModuleMap;

type PayloadActions = Record<string, Record<string, (payload: any) => void>>;

type PayloadModuleActions<A> = {
  [N in keyof A]: A[N] extends (...args: any) => any
    ? undefined extends Parameters<A[N]>[1]
      ? () => void
      : (payload: Parameters<A[N]>[1]) => void
    : never;
};

type Reducer<S> = (state: S, action: (action: ActionParam) => void) => S;

declare global {
  interface ModuleMap {
    options: typeof options;
    template: typeof template;
    layerPopup: typeof layerPopup;
    dataStore: typeof dataStore;
    grid: typeof grid;
  }
}

type CalendarState = {
  [key in keyof ModuleMap]: 'state' extends keyof ModuleMap[key]
    ? GetStateType<ModuleMap[key]['state']>
    : never;
};

type CalendarActions = {
  [key in keyof ModuleMap]: 'actions' extends keyof ModuleMap[key] ? ModuleMap[key]['actions'] : {};
};

type ModulePayloadActionMap = {
  [key in keyof CalendarActions]: PayloadModuleActions<CalendarActions[key]>;
};

type FlattenActionMap = {
  [key in keyof CalendarActions]: GetFlattenActionMap<key>;
};

type ActionMap<Actions> = {
  [key in keyof Actions]: (payload: any) => void;
};

type ActionMapper<NAME extends ModuleKeys> = ActionMap<CalendarActions[NAME]>;

type GetFlattenActionMap<NAME extends ModuleKeys> = {
  [key in `${NAME}/${string & keyof ActionMapper<NAME>}`]: (payload: any) => void;
};

type ObjKeyof<T> = T extends object ? keyof T : never;
type KeyofKeyof<T> = ObjKeyof<T> | { [K in keyof T]: ObjKeyof<T[K]> }[keyof T];
type StripNever<T> = Pick<T, { [K in keyof T]: [T[K]] extends [never] ? never : K }[keyof T]>;
type Lookup<T, K> = T extends any ? (K extends keyof T ? T[K] : never) : never;
type Flatten<T> = T extends object
  ? StripNever<
      {
        [K in KeyofKeyof<T>]:
          | Exclude<K extends keyof T ? T[K] : never, object>
          | { [P in keyof T]: Lookup<T[P], K> }[keyof T];
      }
    >
  : T;

type FlattenActions = Flatten<FlattenActionMap>;

interface LayerPopupState {
  popupType: PopupType | null;
  param: PopupParamMap[PopupType];
}

type CalendarMonthOption = Required<MonthOption>;
type CalendarWeekOption = Required<WeekOption>;

interface OptionData {
  useCreationPopup: boolean;
  useDetailPopup: boolean;
  month: CalendarMonthOption;
  week: CalendarWeekOption;
}

interface BasePopupParam {
  popupRect: PopupRect;
  close?: () => void;
}

type PopupParamMap = {
  seeMore: SeeMorePopupParam;
  creation: CreationPopupParam;
  detail: DetailPopupParam;
};

interface SeeMorePopupParam extends BasePopupParam {
  date: TZDate;
  events: ScheduleViewModel[];
}

interface CreationPopupParam extends BasePopupParam {
  // @TODO: 팝업 작성 시 타입 정의
  start: TZDate;
  end: TZDate;
  isAllDay: boolean;
}

interface DetailPopupParam extends BasePopupParam {
  // @TODO: 팝업 작성 시 타입 정의
  date: TZDate | Date;
}

type PopupRect = {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
};

interface PanelState {
  height: number;
}

interface LayoutState {
  [key: string]: PanelState;
}
