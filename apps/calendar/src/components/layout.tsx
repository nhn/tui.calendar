import {
  cloneElement,
  createContext,
  FunctionComponent,
  h,
  isValidElement,
  toChildArray,
  VNode,
} from 'preact';
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'preact/hooks';

import Panel, { filterPanels, getPanelPropsList, Props as PanelProps } from '@src/components/panel';
import {
  Direction,
  getLayoutStylesFromInfo,
  layoutPanels,
  PanelSize,
  resizeByAbsoluteMode,
  resizeByRelativeMode,
  ResizeMode,
} from '@src/controller/layout';
import { DragPositionInfo } from '@src/components/draggable';
import { getSize } from '@src/util/domutil';
import { PanelElementRectMap, PanelInfo, PanelRect } from '@src/controller/panel';
import { cls } from '@src/util/cssHelper';
import { noop } from '@src/util';
import { PANEL_NAME } from '@src/controller/week';
import { Task } from '@src/components/panel/schedules';
import { isSameArray } from '@src/util/array';

interface Props {
  children: VNode<typeof Panel> | VNode<typeof Panel>[];
  direction?: Direction;
  height?: number;
  width?: number;
  resizeMode?: ResizeMode;
}

type Child = VNode<any> | string | number;
type SizeType = 'width' | 'height' | 'resizerWidth' | 'resizerHeight';
interface PanelState {
  height: number;
  scheduleHeight: number;
  maxScheduleHeightMap: number[];
  renderedScheduleHeightMap: number[];
  events: Task[];
  // test: number[];
}
interface LayoutState {
  milestone: PanelState;
  task: PanelState;
  allday: PanelState;
  time: PanelState;
}
export const INIT_STATE = 'initState';
export const UPDATE_PANEL_HEIGHT = 'updatePanelHeight';
export const UPDATE_SCHEDULE_HEIGHT = 'updateScheduleHeight';
export const UPDATE_SCHEDULE_HEIGHT_MAP = 'updateScheduleHeightMap';
export const UPDATE_MAX_SCHEDULE_HEIGHT_MAP = 'updateMaxScheduleHeightMap';
export const UPDATE_EVENTS = 'updateEvents';
export const UPDATE_PANEL_HEIGHT_TO_MAX = 'updatePanelHeightToMax';
export type PanelActionType =
  | typeof INIT_STATE
  | typeof UPDATE_PANEL_HEIGHT
  | typeof UPDATE_SCHEDULE_HEIGHT
  | typeof UPDATE_SCHEDULE_HEIGHT_MAP
  | typeof UPDATE_MAX_SCHEDULE_HEIGHT_MAP
  | typeof UPDATE_EVENTS
  | typeof UPDATE_PANEL_HEIGHT_TO_MAX;
interface PanelAction {
  type: PanelActionType;
  panelType: PANEL_NAME;
  state: Partial<PanelState>;
}
type Dispatch = (action: PanelAction) => void;

const sizeKeys: Array<SizeType> = ['width', 'height', 'resizerWidth', 'resizerHeight'];
const defaultPanelState: PanelState = {
  height: 20,
  scheduleHeight: 20,
  maxScheduleHeightMap: [],
  renderedScheduleHeightMap: [],
  events: [],
};
const defaultLayoutState: LayoutState = {
  milestone: { ...defaultPanelState },
  task: { ...defaultPanelState },
  allday: { ...defaultPanelState },
  time: { ...defaultPanelState },
};

function reducer(prevState: LayoutState, action: PanelAction) {
  const { type, panelType, state } = action;

  switch (type) {
    case INIT_STATE: {
      return {
        ...prevState,
        [panelType]: {
          ...prevState[panelType],
          ...state,
          test: [state.height],
        },
      };
    }
    case UPDATE_EVENTS: {
      if (isSameArray(prevState[panelType].events ?? [], state.events ?? [])) {
        return prevState;
      }

      prevState[panelType].events = state.events ?? [];

      return prevState;
    }
    case UPDATE_PANEL_HEIGHT:
    case UPDATE_SCHEDULE_HEIGHT: {
      // 맵 계산 로직
      const test = [state.height];

      return {
        ...prevState,
        [panelType]: {
          ...prevState[panelType],
          ...state,
          test,
        },
      };
    }
    case UPDATE_SCHEDULE_HEIGHT_MAP: {
      if (
        isSameArray(
          prevState[panelType].renderedScheduleHeightMap ?? [],
          state.renderedScheduleHeightMap ?? []
        )
      ) {
        return prevState;
      }

      return {
        ...prevState,
        [panelType]: {
          ...prevState[panelType],
          ...state,
        },
      };
    }
    case UPDATE_MAX_SCHEDULE_HEIGHT_MAP: {
      if (
        isSameArray(
          prevState[panelType].maxScheduleHeightMap ?? [],
          state.maxScheduleHeightMap ?? []
        )
      ) {
        return prevState;
      }

      return {
        ...prevState,
        [panelType]: {
          ...prevState[panelType],
          ...state,
        },
      };
    }
    case UPDATE_PANEL_HEIGHT_TO_MAX: {
      const max = Math.max(...prevState[panelType].maxScheduleHeightMap);

      return {
        ...prevState,
        [panelType]: {
          ...prevState[panelType],
          height: prevState[panelType].scheduleHeight * max,
        },
      };
    }
    default:
      return prevState;
  }
}

export const PanelStateStore = createContext<LayoutState>(defaultLayoutState);
export const PanelDispatchStore = createContext<Dispatch>(noop);

export const Layout: FunctionComponent<Props> = ({
  direction = Direction.COLUMN,
  resizeMode = ResizeMode.RELATIVE,
  children,
  width,
  height,
}) => {
  const [panels, setPanels] = useState<PanelSize[]>([]);
  const panelElementRectMap: PanelElementRectMap = useMemo(() => {
    return {};
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, defaultLayoutState);

  const getClassNames = () => {
    const classNames = [cls('layout')];
    if (direction === Direction.ROW) {
      classNames.push(cls('horizontal'));
    }

    return classNames.join(' ');
  };
  const updatePanels = useCallback(
    (isResizeMode = false) => {
      const getPanelInfoList = () => {
        return getPanelPropsList(filterPanels(toChildArray(children))).map(
          (panelProps: PanelInfo) => {
            const panelRect = panelElementRectMap[panelProps.name];
            if (panelRect) {
              sizeKeys.forEach((key: SizeType) => {
                if (!panelProps[key] || isResizeMode) {
                  panelProps[key] = panelRect[key];
                }
              });
            }

            return panelProps;
          }
        );
      };
      const getLayoutPanels = () => {
        const panelInfoList = getPanelInfoList();
        const sizeByProps = { width, height };
        const elementSize = ref.current ? getSize(ref.current) : sizeByProps;

        return layoutPanels(panelInfoList, {
          direction,
          width: width ?? elementSize.width,
          height: width ?? elementSize.height,
        });
      };

      setPanels(getLayoutPanels());
    },
    [children, direction, height, panelElementRectMap, width]
  );
  const onResizeEnd = (panelName: string, dragPositionInfo: DragPositionInfo) => {
    const isResizeMode = true;
    if (resizeMode === ResizeMode.RELATIVE) {
      const panelPropsList = getPanelPropsList(filterPanels(toChildArray(children)));
      resizeByRelativeMode(
        panelName,
        direction,
        panelPropsList,
        panelElementRectMap,
        dragPositionInfo
      );
    } else if (resizeMode === ResizeMode.ABSOLUTE) {
      resizeByAbsoluteMode(panelName, panelElementRectMap, dragPositionInfo);
    }

    updatePanels(isResizeMode);
  };
  const onPanelRectUpdated = (panelName: string, panelRect: PanelRect) => {
    panelElementRectMap[panelName] = panelRect;
  };
  const handlers = { onResizeEnd, onPanelRectUpdated };

  const renderPanel = (child: Child, panelDirection: Direction, size: PanelSize) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        panelDirection,
        ...handlers,
        ...size,
      } as Partial<PanelProps>);
    }

    return child;
  };

  useEffect(() => {
    updatePanels();
  }, [updatePanels]);

  const filteredPanels = filterPanels(toChildArray(children));

  return (
    <PanelStateStore.Provider value={state}>
      <PanelDispatchStore.Provider value={dispatch}>
        <div ref={ref} className={getClassNames()} style={getLayoutStylesFromInfo(width, height)}>
          {filteredPanels.map((panel, index) => renderPanel(panel, direction, panels[index]))}
        </div>
      </PanelDispatchStore.Provider>
    </PanelStateStore.Provider>
  );
};
