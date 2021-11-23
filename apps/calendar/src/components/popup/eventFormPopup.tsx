import { FunctionComponent, h } from 'preact';

import { CalendarSelector } from '@src/components/popup/calendarSelector';
import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { ConfirmPopupButton } from '@src/components/popup/confirmPopupButton';
import { DateSelector } from '@src/components/popup/dateSelector';
import { EventStateSelector } from '@src/components/popup/eventStateSelector';
import { LocationInputBox } from '@src/components/popup/locationInputBox';
import { PopupSection } from '@src/components/popup/popupSection';
import { TitleInputBox } from '@src/components/popup/titleInputBox';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';

import { EventFormPopupParam } from '@t/store';

export const EventFormPopup: FunctionComponent<EventFormPopupParam> = ({
  start,
  end,
  isAllday = false,
  close,
}) => {
  const { calendars } = useStore((state) => state.calendar);

  return (
    <div className={cls('popup-container')}>
      <CalendarSelector calendars={calendars} />
      <TitleInputBox />
      <LocationInputBox />
      <DateSelector start={start} end={end} isAllday={isAllday} />
      <EventStateSelector />
      <ClosePopupButton close={close} />
      <PopupSection>
        <ConfirmPopupButton />
      </PopupSection>
    </div>
  );
};
