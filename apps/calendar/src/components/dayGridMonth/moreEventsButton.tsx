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

  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleClick = () => {
    reset();
    onClickButton();
  };

  return (
    // NOTE: use `onMouseDown` event to prevent `useDrag` from firing
    <button type="button" onMouseDown={handleMouseDown} onClick={handleClick} className={className}>
      <Template template="monthGridHeaderExceed" model={number} />
    </button>
  );
}
