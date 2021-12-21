import { FunctionComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import DatePicker from 'tui-date-picker';

import { PopupSection } from '@src/components/popup/popupSection';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { optionsSelector } from '@src/selectors';
import TZDate from '@src/time/date';

interface Props {
  start: TZDate;
  end: TZDate;
  isAllday: boolean;
}

const classNames = {
  datePickerContainer: cls('datepicker-container'),
  datePicker: cls('popup-section-item', 'popup-date-picker'),
  allday: cls('popup-section-item', 'popup-section-allday'),
  dateIcon: cls('icon', 'ic-date'),
  dateDash: cls('popup-date-dash'),
  content: cls('content'),
};

export const DateSelector: FunctionComponent<Props> = ({
  start,
  end,
  isAllday: initialIsAllday,
}) => {
  const { usageStatistics } = useStore(optionsSelector);
  const [isAllday, setAllday] = useState(initialIsAllday);
  const toggleAllday = () => setAllday((prev) => !prev);
  const startPickerContainerRef = useRef<HTMLDivElement>(null);
  const startPickerInputRef = useRef<HTMLInputElement>(null);
  const endPickerContainerRef = useRef<HTMLDivElement>(null);
  const endPickerInputRef = useRef<HTMLInputElement>(null);

  // NOTE: Setting default start/end time when editing allday event first time.
  // This logic refers to Apple calendar's behavior.
  if (initialIsAllday) {
    start.setHours(12, 0, 0);
    end.setHours(13, 0, 0);
  }

  useEffect(() => {
    if (
      startPickerContainerRef.current &&
      startPickerInputRef.current &&
      endPickerContainerRef.current &&
      endPickerInputRef.current
    ) {
      DatePicker.createRangePicker({
        startpicker: {
          date: start.toDate(),
          input: startPickerInputRef.current,
          container: startPickerContainerRef.current,
        },
        endpicker: {
          date: end.toDate(),
          input: endPickerInputRef.current,
          container: endPickerContainerRef.current,
        },
        format: isAllday ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm',
        timePicker: isAllday
          ? false
          : {
              showMeridiem: false,
              usageStatistics,
            },
        usageStatistics,
      });
    }
  }, [start, end, isAllday, usageStatistics]);

  return (
    <PopupSection>
      <div className={classNames.datePicker}>
        <span className={classNames.dateIcon} />
        <input className={classNames.content} placeholder="Start date" ref={startPickerInputRef} />
        <div className={classNames.datePickerContainer} ref={startPickerContainerRef} />
      </div>
      <span className={classNames.dateDash}>-</span>
      <div className={classNames.datePicker}>
        <span className={classNames.dateIcon} />
        <input className={classNames.content} placeholder="End date" ref={endPickerInputRef} />
        <div className={classNames.datePickerContainer} ref={endPickerContainerRef} />
      </div>
      <div className={classNames.allday} onClick={toggleAllday}>
        <span
          className={cls('icon', {
            'ic-checkbox-normal': !isAllday,
            'ic-checkbox-checked': isAllday,
          })}
        />
        <span className={classNames.content}>All day</span>
      </div>
    </PopupSection>
  );
};
