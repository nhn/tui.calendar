import { h } from 'preact';

import { CalendarDropdownMenu } from '@src/components/popup/calendarDropdownMenu';
import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';
import { useDropdownState } from '@src/hooks/common/useDropdownState';
import type { FormStateDispatcher } from '@src/hooks/popup/useFormState';
import { FormStateActionType } from '@src/hooks/popup/useFormState';

import type { CalendarInfo } from '@t/options';

interface Props {
  calendars: CalendarInfo[];
  formStateDispatch: FormStateDispatcher;
}

const classNames = {
  popupSection: ['dropdown-section', 'calendar-section'],
  popupSectionItem: cls('popup-section-item', 'popup-button'),
  dotIcon: cls('icon', 'dot'),
  content: cls('content', 'event-calendar'),
};

export function CalendarSelector({ calendars, formStateDispatch }: Props) {
  const { isOpened, setOpened, toggleDropdown } = useDropdownState();
  const [{ bgColor, name }] = calendars;

  const changeIndex = (index: number) =>
    formStateDispatch({ type: FormStateActionType.setCalendarId, calendarId: calendars[index].id });

  return (
    <PopupSection onClick={toggleDropdown} classNames={classNames.popupSection}>
      <button type="button" className={classNames.popupSectionItem}>
        <span className={classNames.dotIcon} style={{ backgroundColor: bgColor }} />
        <span className={classNames.content}>{name}</span>
        <span className={cls('icon', 'ic-dropdown-arrow', { open: isOpened })} />
      </button>
      {isOpened && (
        <CalendarDropdownMenu
          calendars={calendars}
          setOpened={setOpened}
          onChangeIndex={changeIndex}
        />
      )}
    </PopupSection>
  );
}
