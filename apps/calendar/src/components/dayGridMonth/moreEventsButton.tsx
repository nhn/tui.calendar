import { h } from 'preact';

import { Template } from '@src/components/template';
import { CellBarType } from '@src/constants/grid';
import { useDispatch } from '@src/contexts/calendarStore';
import type { TemplateName } from '@src/template/default';

interface Props {
  type?: CellBarType;
  number: number;
  onClickButton: () => void;
  className: string;
}

export function MoreEventsButton({ type, number, onClickButton, className }: Props) {
  const { reset } = useDispatch('dnd');

  // prevent unexpected grid selection when clicking on the button
  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleClick = () => {
    reset();
    onClickButton();
  };

  const exceedButtonTemplate = `monthGrid${
    type === CellBarType.header ? 'Header' : 'Footer'
  }Exceed` as TemplateName;

  return (
    <button type="button" onMouseDown={handleMouseDown} onClick={handleClick} className={className}>
      <Template template={exceedButtonTemplate} param={number} />
    </button>
  );
}
