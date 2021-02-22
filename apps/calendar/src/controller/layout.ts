import { limit } from '@src/util/math';
import {
  PanelInfo,
  isPanelShown,
  PanelElementRectMap,
  getResizeInfoByGrowth,
} from '@src/controller/panel';
import { DragPositionInfo } from '@src/components/draggable';

export type Styles = Record<string, string | number>;
export enum Direction {
  COLUMN,
  ROW,
}
export enum ResizeMode {
  RELATIVE,
  ABSOLUTE,
}
export interface LayoutConstraints {
  direction: Direction;
  width?: number;
  height?: number;
}
export interface PanelSize {
  width: number | null;
  height: number | null;
  resizerWidth: number | null;
  resizerHeight: number | null;
}
interface PanelSizeInfo extends PanelSize {
  direction: Direction;
  autoSize: number;
}

// eslint-disable-next-line complexity
export function limitPanelSize(
  val: number | null = null,
  min: number | null = null,
  max: number | null = null
): number | null {
  val = val || min;
  min = min || val;

  if (val && !max) {
    return Math.max(val, min || val);
  }

  if (val && min && max) {
    return limit(val, [min], [max]);
  }

  return null;
}

function getAutoSizeInfo(panel: PanelInfo | PanelSizeInfo) {
  const autoSize = panel.autoSize || 0;
  const hasAutoSize = autoSize > 0;

  return {
    autoSize,
    hasAutoSize,
  };
}

function getAutoSizedPanelSize(
  panelSizeInfo: PanelSizeInfo,
  remainingSize: number,
  totalAutoSize: number
) {
  const { autoSize, hasAutoSize } = getAutoSizeInfo(panelSizeInfo);
  const { height = null, width = null, resizerHeight = null, resizerWidth = null } = panelSizeInfo;
  const panelSize: PanelSize = {
    height: hasAutoSize ? remainingSize * (autoSize / totalAutoSize) : height,
    width: hasAutoSize ? remainingSize * (autoSize / totalAutoSize) : width,
    resizerHeight,
    resizerWidth,
  };

  return panelSize;
}

// set length null on opposite side because it's not used.
function setOppositeSideLengthNull(direction: Direction, panelSize: PanelSize) {
  if (direction === Direction.COLUMN) {
    panelSize.width = null;
  } else {
    panelSize.height = null;
  }

  return panelSize;
}

function getPanelSize(
  panel: PanelSizeInfo,
  remainingSize: number,
  totalAutoSize: number,
  maxSize?: number
) {
  const { hasAutoSize } = getAutoSizeInfo(panel);
  const panelSize = getAutoSizedPanelSize(panel, remainingSize, totalAutoSize);

  setOppositeSideLengthNull(panel.direction, panelSize);

  // autoSize must be with LayoutConstraints.height/width or size is null
  if (hasAutoSize && !maxSize) {
    panelSize.height = null;
    panelSize.width = null;
  }

  return panelSize;
}

function getTargetMaxSize(panel: PanelInfo) {
  const { expandable, maxHeight, maxExpandableHeight, maxWidth, maxExpandableWidth } = panel;

  const targetMaxHeight = expandable ? maxExpandableHeight : maxHeight;
  const targetMaxWidth = expandable ? maxExpandableWidth : maxWidth;

  return {
    width: targetMaxWidth,
    height: targetMaxHeight,
  };
}

function getLimitedPanelSize(panel: PanelInfo) {
  const { height, minHeight, resizerHeight = null, width, minWidth, resizerWidth = null } = panel;
  const { width: maxWidth, height: maxHeight } = getTargetMaxSize(panel);
  const panelSize: PanelSize = {
    height: limitPanelSize(height, minHeight, maxHeight),
    width: limitPanelSize(width, minWidth, maxWidth),
    resizerHeight,
    resizerWidth,
  };

  return panelSize;
}

function getNumberValue(number: number | null) {
  return number || 0;
}

function getRemainingLength(direction: Direction, remainingLength: number, panelSize: PanelSize) {
  const height = getNumberValue(panelSize.height);
  const width = getNumberValue(panelSize.width);
  const resizerHeight = getNumberValue(panelSize.resizerHeight);
  const resizerWidth = getNumberValue(panelSize.resizerWidth);

  if (direction === Direction.COLUMN) {
    remainingLength -= height + resizerHeight;
  } else if (direction === Direction.ROW) {
    remainingLength -= width + resizerWidth;
  }

  if (remainingLength < 0) {
    remainingLength = 0;
  }

  return remainingLength;
}

export function layoutPanels(panels: PanelInfo[], constraint: LayoutConstraints): PanelSize[] {
  const { direction } = constraint;
  const maxLength = direction === Direction.COLUMN ? constraint.height : constraint.width;
  let remainingLength = maxLength ? maxLength : 0;

  let totalAutoSize = 0;
  const panelSizeInfoList: PanelSizeInfo[] = panels.filter(isPanelShown).map((panel) => {
    const { autoSize, hasAutoSize } = getAutoSizeInfo(panel);
    let panelSize = getLimitedPanelSize(panel);
    panelSize = setOppositeSideLengthNull(direction, panelSize);

    if (hasAutoSize) {
      totalAutoSize += autoSize;
    }

    if (maxLength && !autoSize) {
      remainingLength = getRemainingLength(direction, remainingLength, panelSize);
    }

    return {
      direction,
      autoSize,
      ...panelSize,
    };
  });

  const panelSizeList: PanelSize[] = panelSizeInfoList.map((panel) =>
    getPanelSize(panel, remainingLength, totalAutoSize, maxLength)
  );

  return panelSizeList;
}

export function getLayoutStylesFromInfo(width?: number, height?: number) {
  const styles: Styles = {};

  if (width) {
    styles.width = width;
  }
  if (height) {
    styles.height = height;
  }

  return styles;
}

/**
 * mutable method
 */
export function resizeByAbsoluteMode(
  panelName: string,
  panelElementRectMap: PanelElementRectMap,
  dragPositionInfo: DragPositionInfo
) {
  const panelRect = panelElementRectMap[panelName];
  const { startX, startY, endX, endY } = dragPositionInfo;
  const diffWidth = endX - startX;
  const diffHeight = endY - startY;

  panelRect.width += diffWidth;
  panelRect.height += diffHeight;
}

/**
 * mutable method
 */
export function resizeByRelativeMode(
  panelName: string,
  direction: Direction,
  panelPropsList: PanelInfo[],
  panelElementRectMap: PanelElementRectMap,
  dragPositionInfo: DragPositionInfo
) {
  const { startX, startY, endX, endY } = dragPositionInfo;
  const diffWidth = startX - endX;
  const diffHeight = startY - endY;
  const toNext = direction === Direction.COLUMN ? diffHeight < 0 : diffWidth < 0;
  let resizedWidth = Math.abs(diffWidth);
  let resizedHeight = Math.abs(diffHeight);

  let panelIndex = -1;
  panelPropsList.forEach((panelProps, index) => {
    if (panelProps.name === panelName) {
      panelIndex = toNext ? index : index + 1;
    }
  });

  if (panelIndex < 0) {
    panelIndex = 0;
  } else if (panelIndex >= panelPropsList.length) {
    panelIndex = panelPropsList.length - 1;
  }

  const targetPanelName = panelPropsList[panelIndex].name;
  const panelRect = panelElementRectMap[targetPanelName];
  const resizeInfo = getResizeInfoByGrowth(
    panelPropsList[panelIndex],
    panelRect,
    resizedWidth,
    resizedHeight
  );

  panelRect.width = resizeInfo.newWidth;
  panelRect.height = resizeInfo.newHeight;

  const targetPanelPropsList = toNext
    ? panelPropsList.slice(panelIndex + 1)
    : panelPropsList.slice(0, panelIndex).reverse();

  targetPanelPropsList.forEach((panelProps) => {
    const { name, resizable, autoSize = 0 } = panelProps;
    const noResize = !resizable || name === targetPanelName || autoSize > 0;
    if (noResize) {
      return;
    }

    const otherPanelRect = panelElementRectMap[name];
    const { newHeight, newWidth, shrinkHeight, shrinkWidth } = getResizeInfoByGrowth(
      panelProps,
      otherPanelRect,
      -resizedWidth,
      -resizedHeight
    );
    otherPanelRect.width = newWidth;
    otherPanelRect.height = newHeight;
    resizedWidth -= shrinkWidth;
    resizedHeight -= shrinkHeight;
  });
}
