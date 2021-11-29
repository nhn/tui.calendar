import { FunctionComponent, h } from 'preact';

import { cls } from '@src/helpers/css';

import { EventState } from '@t/events';

interface Props {
  setOpened: (isOpened: boolean) => void;
  setEventState: (eventState: EventState) => void;
}

const EVENT_STATES: EventState[] = ['Busy', 'Free'];
const classNames = {
  popupSectionItem: cls('popup-section-item', 'dropdown-menu-item'),
  dropdownMenu: cls('dropdown-menu'),
  icon: cls('icon'),
  content: cls('content'),
};

export const StateDropdownMenu: FunctionComponent<Props> = ({ setOpened, setEventState }) => {
  const onClickDropdown = (e: MouseEvent, state: EventState) => {
    e.stopPropagation();
    setOpened(false);
    setEventState(state);
  };

  return (
    <ul className={classNames.dropdownMenu}>
      {EVENT_STATES.map((state) => (
        <li
          key={state}
          className={classNames.popupSectionItem}
          onClick={(e) => onClickDropdown(e, state)}
        >
          <span className={classNames.icon} />
          <span className={classNames.content}>{state}</span>
        </li>
      ))}
    </ul>
  );
};
