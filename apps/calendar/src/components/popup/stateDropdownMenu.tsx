import { FunctionComponent, h } from 'preact';

import { cls } from '@src/helpers/css';

import { EventState } from '@t/events';

interface Props {
  setOpened: (isOpened: boolean) => void;
  setEventState: (eventState: EventState) => void;
}

const EVENT_STATES: EventState[] = ['Busy', 'Free'];

export const StateDropdownMenu: FunctionComponent<Props> = ({ setOpened, setEventState }) => {
  const onClickDropdown = (e: MouseEvent, state: EventState) => {
    e.stopPropagation();
    setOpened(false);
    setEventState(state);
  };

  return (
    <ul className={cls('dropdown-menu')}>
      {EVENT_STATES.map((state) => (
        <li
          key={state}
          className={cls('popup-section-item', 'dropdown-menu-item')}
          onClick={(e) => onClickDropdown(e, state)}
        >
          <span className={cls('icon')} />
          <span className={cls('content')}>{state}</span>
        </li>
      ))}
    </ul>
  );
};
