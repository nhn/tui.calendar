import type { RefObject } from 'preact';
import { h } from 'preact';
import { forwardRef } from 'preact/compat';
import { useEffect, useRef } from 'preact/hooks';

import type { DateRangePicker } from 'tui-date-picker';
import DatePicker from 'tui-date-picker';

import { PopupSection } from '@src/components/popup/popupSection';
import { Template } from '@src/components/template';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import type { FormStateDispatcher } from '@src/hooks/popup/useFormState';
import { FormStateActionType } from '@src/hooks/popup/useFormState';
import { useStringOnlyTemplate } from '@src/hooks/template/useStringOnlyTemplate';
import { optionsSelector } from '@src/selectors';
import TZDate from '@src/time/date';

interface Props {
  start: TZDate;
  end: TZDate;
  isAllday?: boolean;
  formStateDispatch: FormStateDispatcher;
}

const classNames = {
  datePickerContainer: cls('datepicker-container'),
  datePicker: cls('popup-section-item', 'popup-date-picker'),
  allday: cls('popup-section-item', 'popup-section-allday'),
  dateIcon: cls('icon', 'ic-date'),
  dateDash: cls('popup-date-dash'),
  content: cls('content'),
};

export const DateSelector = forwardRef<DateRangePicker, Props>(function DateSelector(
  { start, end, isAllday = false, formStateDispatch },
  ref
) {
  const { usageStatistics } = useStore(optionsSelector);
  const startPickerContainerRef = useRef<HTMLDivElement>(null);
  const startPickerInputRef = useRef<HTMLInputElement>(null);
  const endPickerContainerRef = useRef<HTMLDivElement>(null);
  const endPickerInputRef = useRef<HTMLInputElement>(null);

  const startDatePlaceholder = useStringOnlyTemplate({
    template: 'startDatePlaceholder',
    defaultValue: 'Start Date',
  });
  const endDatePlaceholder = useStringOnlyTemplate({
    template: 'endDatePlaceholder',
    defaultValue: 'End Date',
  });
  const toggleAllday = () =>
    formStateDispatch({ type: FormStateActionType.setAllday, isAllday: !isAllday });

  useEffect(() => {
    if (
      startPickerContainerRef.current &&
      startPickerInputRef.current &&
      endPickerContainerRef.current &&
      endPickerInputRef.current
    ) {
      const startDate = new TZDate(start);
      const endDate = new TZDate(end);
      // NOTE: Setting default start/end time when editing allday event first time.
      // This logic refers to Apple calendar's behavior.
      if (isAllday) {
        startDate.setHours(12, 0, 0);
        endDate.setHours(13, 0, 0);
      }

      (ref as RefObject<DateRangePicker>).current = DatePicker.createRangePicker({
        startpicker: {
          date: startDate.toDate(),
          input: startPickerInputRef.current,
          container: startPickerContainerRef.current,
        },
        endpicker: {
          date: endDate.toDate(),
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
  }, [start, end, isAllday, usageStatistics, ref]);

  return (
    <PopupSection>
      <div className={classNames.datePicker}>
        <span className={classNames.dateIcon} />
        <input
          name="start"
          className={classNames.content}
          placeholder={startDatePlaceholder}
          ref={startPickerInputRef}
        />
        <div className={classNames.datePickerContainer} ref={startPickerContainerRef} />
      </div>
      <span className={classNames.dateDash}>-</span>
      <div className={classNames.datePicker}>
        <span className={classNames.dateIcon} />
        <input
          name="end"
          className={classNames.content}
          placeholder={endDatePlaceholder}
          ref={endPickerInputRef}
        />
        <div className={classNames.datePickerContainer} ref={endPickerContainerRef} />
      </div>
      <div className={classNames.allday} onClick={toggleAllday}>
        <span
          className={cls('icon', {
            'ic-checkbox-normal': !isAllday,
            'ic-checkbox-checked': isAllday,
          })}
        />
        <span className={classNames.content}>
          <Template template="popupIsAllday" />
        </span>
        <input
          name="isAllday"
          type="checkbox"
          className={cls('hidden-input')}
          value={isAllday ? 'true' : 'false'}
          checked={isAllday}
        />
      </div>
    </PopupSection>
  );
});
