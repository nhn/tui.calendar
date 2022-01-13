import { h } from 'preact';

import { cls } from '@src/helpers/css';

import { CalendarInfo } from '@t/options';

interface Props {
  open?: boolean;
  calendars: CalendarInfo[];
  setOpened: (isOpened: boolean) => void;
  onChangeIndex: (index: number) => void;
}

interface DropdownMenuItemProps {
  index: number;
  name: string;
  bgColor: string;
  onClick: (e: MouseEvent, index: number) => void;
}

const classNames = {
  dropdownMenu: cls('dropdown-menu'),
  dropdownMenuItem: cls('dropdown-menu-item'),
  dotIcon: cls('icon', 'dot'),
  content: cls('content'),
};

function DropdownMenuItem({ index, name, bgColor, onClick }: DropdownMenuItemProps) {
  return (
    <li className={classNames.dropdownMenuItem} onClick={(e) => onClick(e, index)}>
      <span className={classNames.dotIcon} style={{ backgroundColor: bgColor }} />
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
      {calendars.map(({ name, bgColor = '000' }, index) => (
        <DropdownMenuItem
          key={`dropdown-${name}-${index}`}
          index={index}
          name={name}
          bgColor={bgColor}
          onClick={handleDropdownMenuItemClick}
        />
      ))}
    </ul>
  );
}
