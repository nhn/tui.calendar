import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { PopupSection } from '@src/components/popup/popupSection';
import { StateDropdownMenu } from '@src/components/popup/stateDropdownMenu';
import { cls } from '@src/helpers/css';
import { useDropdownState } from '@src/hooks/common/dropdownState';

import { EventState } from '@t/events';

interface Props {
  eventState: EventState;
}

const classNames = {
  popupSection: ['dropdown-section', 'state-section'],
  popupSectionItem: cls('popup-section-item', 'popup-button'),
  stateIcon: cls('icon', 'ic-state'),
  arrowIcon: cls('icon', 'ic-dropdown-arrow'),
  content: cls('content', 'event-state'),
};

export const EventStateSelector: FunctionComponent<Props> = ({ eventState: initialEventState }) => {
  const [eventState, setEventState] = useState<EventState>(initialEventState);
  const { isOpened, setOpened, toggleDropdown } = useDropdownState();

  return (
    <PopupSection onClick={toggleDropdown} classNames={classNames.popupSection}>
      <button className={classNames.popupSectionItem}>
        <span className={classNames.stateIcon} />
        <span className={classNames.content}>{eventState}</span>
        <span className={classNames.arrowIcon} />
      </button>
      {isOpened && <StateDropdownMenu setOpened={setOpened} setEventState={setEventState} />}
    </PopupSection>
  );
};
