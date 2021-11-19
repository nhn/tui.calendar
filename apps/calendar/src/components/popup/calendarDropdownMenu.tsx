import { FunctionComponent, h } from 'preact';

import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { isFunction, isUndefined } from '@src/utils/type';

import { CalendarInfo } from '@t/option';

interface Props {
  menus: string[];
  open: boolean;
  calendarColor?: string;
  calendars: CalendarInfo[];
}

export const CalendarDropdownMenu: FunctionComponent<Props> = ({
  menus,
  open,
  calendarColor,
  calendars,
}) => {
  return calendars.length ? (
    <ul
      className={cls('dropdown-menu', {
        open,
      })}
    >
      {calendars.map(({ name }, index) => (
        <li key={`dropdown-${name}`} className={cls('dropdown-menu-item')}>
          <span className={cls({ dot: !!name })} style={{ backgroundColor: calendarColor }} />
          <span>menu</span>
        </li>
      ))}
    </ul>
  ) : null;
};
