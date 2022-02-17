import { h } from 'preact';

import { Template } from '@src/components/template';
import { useDispatch } from '@src/contexts/calendarStore';

interface Props {
  number: number;
  onClickButton: () => void;
  className: string;
}

export function MoreEventsButton({ number, onClickButton, className }: Props) {
  const { reset } = useDispatch('dnd');

  // prevent unexpected grid selection when clicking on the button
  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleClick = () => {
    reset();
    onClickButton();
  };

  return (
    <button type="button" onMouseDown={handleMouseDown} onClick={handleClick} className={className}>
      <Template template="monthGridHeaderExceed" model={number} />
    </button>
  );
}
