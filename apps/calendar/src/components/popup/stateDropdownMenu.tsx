import { h } from 'preact';

import { Template } from '@src/components/template';
import { cls } from '@src/helpers/css';

import type { EventState } from '@t/events';

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

export function StateDropdownMenu({ setOpened, setEventState }: Props) {
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
          <span className={classNames.content}>
            {state === 'Busy' ? (
              <Template template="popupStateBusy" />
            ) : (
              <Template template="popupStateFree" />
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
