import { h, FunctionComponent } from 'preact';
import { cls } from '@src/util/cssHelper';
import { Draggable, DragPositionInfo } from '@src/components/draggable';
import { Direction } from '@src/controller/layout';

const BORDER = '1px solid #e5e5e5';
const DEFAULT_LENGTH = 3;
const DEFAULT_STYLES: Record<string, string | number> = {
  borderTop: BORDER,
  borderBottom: BORDER,
};

interface Props {
  direction: Direction;
  width?: number;
  height?: number;
  onResizeStart?: () => void;
  onResizeEnd?: (dragPositionInfo: DragPositionInfo) => void;
}

export const PanelResizer: FunctionComponent<Props> = ({
  direction,
  width = DEFAULT_LENGTH,
  height = DEFAULT_LENGTH,
  onResizeStart,
  onResizeEnd,
}) => {
  const styles = { ...DEFAULT_STYLES };
  const border = BORDER;
  const className = cls('panel-resizer');

  if (direction === Direction.ROW) {
    styles.borderLeft = border;
    styles.borderRight = border;
    styles.height = '100%';
    styles.width = width;
    styles.cursor = 'col-resize';
  } else {
    styles.borderTop = border;
    styles.borderBottom = border;
    styles.height = height;
    styles.width = '100%';
    styles.cursor = 'row-resize';
  }

  const guideStyles = {
    ...styles,
    border: 'none',
    backgroundColor: '#999',
  };

  return (
    <Draggable
      direction={direction}
      onDragStart={onResizeStart}
      onDragEnd={onResizeEnd}
      renderDragElement={() => <div className={cls('panel-resizer-guide')} style={guideStyles} />}
    >
      <div className={className} style={styles} />
    </Draggable>
  );
};
