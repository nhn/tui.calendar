import { FunctionComponent, h } from 'preact';

import { cls } from '@src/helpers/css';

import { CalendarInfo } from '@t/option';

interface Props {
  open?: boolean;
  calendars: CalendarInfo[];
  setOpened: (isOpened: boolean) => void;
  setCalendarIndex: (index: number) => void;
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

const DropdownMenuItem: FunctionComponent<DropdownMenuItemProps> = ({
  index,
  name,
  bgColor,
  onClick,
}) => (
  <li className={classNames.dropdownMenuItem} onClick={(e) => onClick(e, index)}>
    <span className={classNames.dotIcon} style={{ backgroundColor: bgColor }} />
    <span className={classNames.content}>{name}</span>
  </li>
);

export const CalendarDropdownMenu: FunctionComponent<Props> = ({
  calendars,
  setOpened,
  setCalendarIndex,
}) => {
  const onClickDropdownMenuItem = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    setOpened(false);
    setCalendarIndex(index);
  };

  return (
    <ul className={classNames.dropdownMenu}>
      {calendars.map(({ name, bgColor = '000' }, index) => (
        <DropdownMenuItem
          key={`dropdown-${name}-${index}`}
          index={index}
          name={name}
          bgColor={bgColor}
          onClick={onClickDropdownMenuItem}
        />
      ))}
    </ul>
  );
};
