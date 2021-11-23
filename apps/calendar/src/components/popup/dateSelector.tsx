import { FunctionComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import DatePicker from 'tui-date-picker';

import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';
import TZDate from '@src/time/date';

interface Props {
  start: TZDate;
  end: TZDate;
  isAllday: boolean;
}

export const DateSelector: FunctionComponent<Props> = ({
  start,
  end,
  isAllday: initialIsAllday,
}) => {
  const [isAllday, setAllday] = useState(initialIsAllday);
  const startPickerContainerRef = useRef<HTMLDivElement>(null);
  const startPickerInputRef = useRef<HTMLInputElement>(null);
  const endPickerContainerRef = useRef<HTMLDivElement>(null);
  const endPickerInputRef = useRef<HTMLInputElement>(null);

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
              usageStatistics: false,
            },
        usageStatistics: false,
      });
    }
  }, [start, end, isAllday]);

  return (
    <PopupSection>
      <div className={cls('popup-section-item', 'popup-start-date-picker')}>
        <span className={cls('icon', 'ic-date')} />
        <input className={cls('content')} placeholder="Start date" ref={startPickerInputRef} />
        <div className={cls('startpicker-container')} ref={startPickerContainerRef} />
      </div>
      <span className={cls('popup-date-dash')}>-</span>
      <div className={cls('popup-section-item', 'popup-end-date-picker')}>
        <span className={cls('icon', 'ic-date')} />
        <input className={cls('content')} placeholder="End date" ref={endPickerInputRef} />
        <div className={cls('endpicker-container')} ref={endPickerContainerRef} />
      </div>
      <div
        className={cls('popup-section-item', 'popup-section-allday')}
        onClick={() => setAllday((prev) => !prev)}
      >
        <span
          className={cls('icon', {
            'ic-checkbox-normal': !isAllday,
            'ic-checkbox-checked': isAllday,
          })}
        />
        <span className={cls('content')}>All day</span>
      </div>
    </PopupSection>
  );
};
