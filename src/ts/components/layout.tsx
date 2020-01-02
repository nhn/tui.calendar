import { h, Component, toChildArray, VNode, cloneElement, isValidElement, createRef } from 'preact';
import { cls } from '@src/util/cssHelper';
import Panel, { getPanelPropsList, filterPanels, Props as PanelProps } from '@src/components/panel';
import {
  Direction,
  PanelSize,
  ResizeMode,
  layoutPanels,
  getLayoutStylesFromInfo,
  resizeByAbsoluteMode,
  resizeByRelativeMode
} from '@src/controller/layout';
import { DragPositionInfo } from '@src/components/draggable';
import { getSize } from '@src/util/domutil';
import { PanelElementRectMap, PanelRect, PanelInfo } from '@src/controller/panel';

interface Props {
  direction: Direction;
  children: VNode<Panel> | VNode<Panel>[];
  height?: number;
  width?: number;
  resizeMode?: ResizeMode;
}

type Child = VNode<any> | string | number;
type SizeType = 'width' | 'height' | 'resizerWidth' | 'resizerHeight';

const sizeKeys: Array<SizeType> = ['width', 'height', 'resizerWidth', 'resizerHeight'];

export class Layout extends Component<Props> {
  static defaultProps = {
    direction: Direction.COLUMN
  };

  state = {
    panels: []
  };

  panelElementRectMap: PanelElementRectMap = {};

  handlers = {
    onResizeEnd: this.onResizeEnd.bind(this),
    onPanelRectUpdated: this.onPanelRectUpdated.bind(this)
  };

  ref = createRef();

  componentDidMount() {
    this.updatePanels();
  }

  onResizeEnd(panelName: string, dragPositionInfo: DragPositionInfo) {
    const isResizeMode = true;
    const { direction, resizeMode = ResizeMode.RELATIVE, children } = this.props;
    if (resizeMode === ResizeMode.RELATIVE) {
      const panelPropsList = getPanelPropsList(filterPanels(toChildArray(children)));
      resizeByRelativeMode(
        panelName,
        direction,
        panelPropsList,
        this.panelElementRectMap,
        dragPositionInfo
      );
    } else if (resizeMode === ResizeMode.ABSOLUTE) {
      resizeByAbsoluteMode(panelName, this.panelElementRectMap, dragPositionInfo);
    }

    this.updatePanels(isResizeMode);
  }

  onPanelRectUpdated(panelName: string, panelRect: PanelRect) {
    this.panelElementRectMap[panelName] = panelRect;
  }

  updatePanels(isResizeMode = false) {
    this.setState({
      panels: this.layoutPanels(isResizeMode)
    });
  }

  getPanelInfoList(isResizeMode = false) {
    return getPanelPropsList(filterPanels(toChildArray(this.props.children))).map(
      (panelProps: PanelInfo) => {
        const panelRect = this.panelElementRectMap[panelProps.name];
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
  }

  layoutPanels(isResizeMode = false) {
    const { direction } = this.props;
    const panelInfoList = this.getPanelInfoList(isResizeMode);
    const sizeByProps = {
      width: this.props.width,
      height: this.props.height
    };
    const elementSize = this.ref.current ? getSize(this.ref.current) : sizeByProps;
    const resultPanels = layoutPanels(panelInfoList, {
      direction,
      width: sizeByProps.width ? sizeByProps.width : elementSize.width,
      height: sizeByProps.height ? sizeByProps.height : elementSize.height
    });

    return resultPanels;
  }

  getClassNames() {
    const { direction } = this.props;
    const classNames = [cls('layout')];
    if (direction === Direction.ROW) {
      classNames.push(cls('horizontal'));
    }

    return classNames.join(' ');
  }

  renderPanel(child: Child, direction: Direction, size: PanelSize) {
    if (isValidElement(child)) {
      return cloneElement(child, {
        direction,
        ...this.handlers,
        ...size
      } as Partial<PanelProps>);
    }

    return child;
  }

  render() {
    const { direction, width, height } = this.props;
    const panels = filterPanels(toChildArray(this.props.children));
    const panelInfoList = this.state.panels;

    return (
      <div
        ref={this.ref}
        className={this.getClassNames()}
        style={getLayoutStylesFromInfo(width, height)}
      >
        {panels.map((panel, index) => this.renderPanel(panel, direction, panelInfoList[index]))}
      </div>
    );
  }
}
