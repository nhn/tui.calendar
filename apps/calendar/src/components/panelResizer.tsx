import { h } from 'preact';
import { useCallback, useRef, useState } from 'preact/hooks';

import { useDispatch } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/useDrag';

import type { StyleProp } from '@t/components/common';
import type { AlldayEventCategory } from '@t/panel';

interface Props {
  name: AlldayEventCategory;
  width: number;
  height: number;
}

function getDefaultStyle(height: number, border: string) {
  return {
    height,
    width: '100%',
    cursor: 'row-resize',
    borderTop: border,
    borderBottom: border,
  };
}

export function PanelResizer({ name, height }: Props) {
  const border = useTheme(useCallback((theme) => theme.week.panelResizer.border, []));
  const style = getDefaultStyle(height, border);
  const defaultGuideStyle = {
    ...style,
    display: 'none',
    border: 'none',
    backgroundColor: '#999',
  };

  const [guideStyle, setGuideStyle] = useState<StyleProp>(defaultGuideStyle);
  const startPos = useRef<{ left: number; top: number } | null>(null);
  const { updateDayGridRowHeightByDiff } = useDispatch('weekViewLayout');

  const onMouseDown = useDrag(DRAGGING_TYPE_CONSTANTS.panelResizer, {
    onDragStart: (e) => {
      startPos.current = { left: e.pageX, top: e.pageY };
    },
    onDrag: (e) => {
      if (startPos.current) {
        const top = e.pageY - startPos.current.top;

        setGuideStyle((prev) => ({ ...prev, top, display: null }));
      }
    },
    onMouseUp: (e) => {
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
