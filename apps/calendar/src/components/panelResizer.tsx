import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';

import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';

import { StyleProp } from '@t/components/common';
import { AlldayEventCategory } from '@t/panel';

const DEFAULT_BORDER = '1px solid #e5e5e5';
const DEFAULT_STYLE: StyleProp = {
  borderTop: DEFAULT_BORDER,
  borderBottom: DEFAULT_BORDER,
};

interface Props {
  name: AlldayEventCategory;
  width: number;
  height: number;
}

function getDefaultStyle(width: number, height: number) {
  return { ...DEFAULT_STYLE, height, width: '100%', cursor: 'row-resize' };
}

export function PanelResizer({ name, width, height }: Props) {
  const style = getDefaultStyle(width, height);
  const defaultGuideStyle = {
    ...style,
    display: 'none',
    border: 'none',
    backgroundColor: '#999',
  };

  const [guideStyle, setGuideStyle] = useState<StyleProp>(defaultGuideStyle);
  const startPos = useRef<{ left: number; top: number } | null>(null);
  const { updateDayGridRowHeightByDiff } = useDispatch('weekViewLayout');

  const { onMouseDown } = useDrag(DRAGGING_TYPE_CONSTANTS.panelResizer, {
    onDragStart: (e) => {
      startPos.current = { left: e.pageX, top: e.pageY };
    },
    onDrag: (e) => {
      if (startPos.current) {
        const top = e.pageY - startPos.current.top;

        setGuideStyle((prev) => ({ ...prev, top, display: null }));
      }
    },
    onDragEnd: (e) => {
      if (startPos.current) {
        const diff = e.pageY - startPos.current.top;

        startPos.current = null;

        setGuideStyle(defaultGuideStyle);
        updateDayGridRowHeightByDiff({ rowName: name, diff });
      }
    },
  });

  return (
    <div style={{ position: 'relative' }}>
      <div className={cls('panel-resizer')} style={style} onMouseDown={onMouseDown} />
      <div className={cls('panel-resizer-guide')} style={guideStyle} />
    </div>
  );
}
