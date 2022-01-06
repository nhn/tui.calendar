import { h } from 'preact';

import { fireEvent, render, screen } from '@testing-library/preact';

import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import TZDate from '@src/time/date';

import { CalendarStore, InternalStoreAPI } from '@t/store';

const selectors = {
  calendarSection: `.${cls('calendar-section')}`,
  privateButton: `.${cls('popup-section-private')}.${cls('popup-button')}`,
  hiddenDatePicker: `.${cls('datepicker-container')} .tui-datepicker.tui-hidden`,
  timePicker: '.tui-datepicker-footer .tui-timepicker',
};

describe('event form popup', () => {
  let store: InternalStoreAPI<CalendarStore>;
  const start = new TZDate();
  const end = new TZDate();

  beforeEach(() => {
    store = initCalendarStore();
  });

  it('should display CalendarSelector when `calendars` is exists', () => {
    store = initCalendarStore({ calendars: [{ id: '1', name: '1' }] });
    const { container } = render(
      <StoreProvider store={store}>
        <EventFormPopup />
      </StoreProvider>
    );

    const calendarSelector = container.querySelector(selectors.calendarSection);

    expect(calendarSelector).not.toBeNull();
  });

  it('should display CalendarSelector when `calendars` is not exists', () => {
    const { container } = render(
      <StoreProvider store={store}>
        <EventFormPopup />
      </StoreProvider>
    );

    const calendarSelector = container.querySelector(selectors.calendarSection);

    expect(calendarSelector).toBeNull();
  });

  it('should be changed private icon when private button is clicked', () => {
    const { container } = render(
      <StoreProvider store={store}>
        <EventFormPopup />
      </StoreProvider>
    );

    const privateButton = container.querySelector(selectors.privateButton) ?? container;
    let privateIcon = container.querySelector(`.${cls('ic-private')}`);

    expect(privateButton).not.toBeNull();
    expect(privateIcon).toBeNull();

    fireEvent.click(privateButton);

    privateIcon = container.querySelector(`.${cls('ic-private')}`);

    expect(privateIcon).not.toBeNull();
  });

  it('should render range-picker but range-picker is hidden', () => {
    const { container } = render(
      <StoreProvider store={store}>
        <EventFormPopup />
      </StoreProvider>
    );

    const datePicker = container.querySelectorAll(selectors.hiddenDatePicker);

    expect(datePicker).toHaveLength(2);
  });

  ['Start date', 'End date'].forEach((placeholder) => {
    it(`should render range picker when ${placeholder} input is clicked`, () => {
      const { container } = render(
        <StoreProvider store={store}>
          <EventFormPopup />
        </StoreProvider>
      );

      fireEvent.click(screen.getByPlaceholderText(placeholder));
      const datePicker = container.querySelectorAll(selectors.hiddenDatePicker);

      expect(datePicker).toHaveLength(1);
    });
  });

  it('should not render time-picker in range-picker when allday button is clicked', () => {
    const { container } = render(
      <StoreProvider store={store}>
        <EventFormPopup />
      </StoreProvider>
    );

    fireEvent.click(screen.getByText('All day'));
    const timePicker = container.querySelector(selectors.timePicker);

    expect(timePicker).toBeNull();
  });
});
