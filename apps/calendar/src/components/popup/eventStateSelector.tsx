import { FunctionComponent, h } from 'preact';

import { PopupSection } from '@src/components/popup/popupSection';
import { StateDropdownMenu } from '@src/components/popup/stateDropdownMenu';
import { cls } from '@src/helpers/css';
import { useDropdownState } from '@src/hooks/common/dropdownState';
import { FormStateActionType, FormStateDispatcher } from '@src/hooks/popup/formState';

import { EventState } from '@t/events';

interface Props {
  eventState?: EventState;
  formStateDispatch: FormStateDispatcher;
}

const classNames = {
  popupSection: ['dropdown-section', 'state-section'],
  popupSectionItem: cls('popup-section-item', 'popup-button'),
  stateIcon: cls('icon', 'ic-state'),
  arrowIcon: cls('icon', 'ic-dropdown-arrow'),
  content: cls('content', 'event-state'),
};

export const EventStateSelector: FunctionComponent<Props> = ({
  eventState = 'Busy',
  formStateDispatch,
}) => {
  const { isOpened, setOpened, toggleDropdown } = useDropdownState();

  const handleChangeEventState = (state: EventState) =>
    formStateDispatch({ type: FormStateActionType.setState, state });

  return (
    <PopupSection onClick={toggleDropdown} classNames={classNames.popupSection}>
      <button type="button" className={classNames.popupSectionItem}>
        <span className={classNames.stateIcon} />
        <span className={classNames.content}>{eventState}</span>
        <span className={classNames.arrowIcon} />
      </button>
      {isOpened && (
        <StateDropdownMenu setOpened={setOpened} setEventState={handleChangeEventState} />
      )}
    </PopupSection>
  );
};
