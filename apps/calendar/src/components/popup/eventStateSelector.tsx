import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { PopupSection } from '@src/components/popup/popupSection';
import { StateDropdownMenu } from '@src/components/popup/stateDropdownMenu';
import { cls } from '@src/helpers/css';

import { EventState } from '@t/events';

export const EventStateSelector: FunctionComponent = () => {
  const [isOpened, setOpened] = useState(false);
  const [eventState, setEventState] = useState<EventState>('Busy');
  const onClick = () => setOpened(!isOpened);

  return (
    <PopupSection onClick={onClick} classNames={['dropdown-section', 'state-section']}>
      <button className={cls('popup-section-item', 'popup-button')}>
        <span className={cls('icon', 'ic-state')} />
        <span className={cls('content', 'event-state')}>{eventState}</span>
        <span className={cls('icon', 'ic-dropdown-arrow')} />
      </button>
      {isOpened && <StateDropdownMenu setOpened={setOpened} setEventState={setEventState} />}
    </PopupSection>
  );
};
