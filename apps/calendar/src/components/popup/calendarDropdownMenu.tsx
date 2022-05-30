import { h } from 'preact';

import { cls } from '@src/helpers/css';

import type { CalendarInfo } from '@t/options';

interface Props {
  open?: boolean;
  calendars: CalendarInfo[];
  setOpened: (isOpened: boolean) => void;
  onChangeIndex: (index: number) => void;
}

interface DropdownMenuItemProps {
  index: number;
  name: string;
  backgroundColor: string;
  onClick: (e: MouseEvent, index: number) => void;
}

const classNames = {
  dropdownMenu: cls('dropdown-menu'),
  dropdownMenuItem: cls('dropdown-menu-item'),
  dotIcon: cls('icon', 'dot'),
  content: cls('content'),
};

function DropdownMenuItem({ index, name, backgroundColor, onClick }: DropdownMenuItemProps) {
  return (
    <li className={classNames.dropdownMenuItem} onClick={(e) => onClick(e, index)}>
      <span className={classNames.dotIcon} style={{ backgroundColor }} />
      <span className={classNames.content}>{name}</span>
    </li>
  );
}

export function CalendarDropdownMenu({ calendars, setOpened, onChangeIndex }: Props) {
  const handleDropdownMenuItemClick = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    setOpened(false);
    onChangeIndex(index);
  };

  return (
    <ul className={classNames.dropdownMenu}>
      {calendars.map(({ name, backgroundColor = '000' }, index) => (
        <DropdownMenuItem
          key={`dropdown-${name}-${index}`}
          index={index}
          name={name}
          backgroundColor={backgroundColor}
          onClick={handleDropdownMenuItemClick}
        />
      ))}
    </ul>
  );
}
