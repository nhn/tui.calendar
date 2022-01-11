import { FunctionComponent, h } from 'preact';

import { fireEvent, render, RenderResult, screen } from '@testing-library/preact';

import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import { initCalendarStore, StoreProvider, useDispatch } from '@src/contexts/calendarStore';
import { EventBusProvider } from '@src/contexts/eventBus';
import { FloatingLayerContainerProvider } from '@src/contexts/floatingLayer';
import { cls } from '@src/helpers/css';
import { PopupType } from '@src/slices/popup';
import TZDate from '@src/time/date';
import { EventBusImpl } from '@src/utils/eventBus';

const selectors = {
  calendarSection: `.${cls('calendar-section')}`,
  privateButton: `.${cls('popup-section-private')}.${cls('popup-button')}`,
  privateIcon: `.${cls('ic-private')}`,
  hiddenDatePicker: `.${cls('datepicker-container')} .tui-datepicker.tui-hidden`,
  timePicker: '.tui-datepicker-footer .tui-timepicker',
};

describe('event form popup', () => {
  let renderResult: RenderResult;
  const start = new TZDate();
  const end = new TZDate();

  const Wrapper: FunctionComponent = ({ children }) => {
    const eventBus = new EventBusImpl<any>();
    const { show } = useDispatch('popup');
    show({
      type: PopupType.form,
      param: {
        start,
        end,
        isAllday: false,
        isPrivate: false,
        popupPosition: {
          top: 0,
          left: 0,
          right: 100,
          bottom: 100,
        },
      },
    });

    return (
      <EventBusProvider value={eventBus}>
        <FloatingLayerContainerProvider>{children}</FloatingLayerContainerProvider>
      </EventBusProvider>
    );
  };

  beforeEach(() => {
    const store = initCalendarStore();

    renderResult = render(
      <StoreProvider store={store}>
        <Wrapper>
          <EventFormPopup />
        </Wrapper>
      </StoreProvider>
    );
  });

  it('should display CalendarSelector when `calendars` is exists', () => {
    const calendars = [{ id: '1', name: 'calendar name' }];
    const store = initCalendarStore({ calendars });

    render(
      <StoreProvider store={store}>
        <Wrapper>
          <EventFormPopup />
        </Wrapper>
      </StoreProvider>
    );

    const calendarSelectorContent = screen.getByRole('button', { name: calendars[0].name });

    expect(calendarSelectorContent).not.toBeNull();
  });

  it('should display CalendarSelector when `calendars` is not exists', () => {
    const { container } = renderResult;

    const calendarSelector = container.querySelector(selectors.calendarSection);

    expect(calendarSelector).toBeNull();
  });

  it('should be changed private icon when private button is clicked', () => {
    const { container } = renderResult;

    const privateButton = container.querySelector(selectors.privateButton) ?? container;
    let privateIcon = container.querySelector(selectors.privateIcon);

    expect(privateButton).not.toBeNull();
    expect(privateIcon).toBeNull();

    fireEvent.click(privateButton);

    privateIcon = container.querySelector(selectors.privateIcon);

    expect(privateIcon).not.toBeNull();
  });

  it('should render range-picker but range-picker is hidden', () => {
    const { container } = renderResult;

    const datePicker = container.querySelectorAll(selectors.hiddenDatePicker);

    expect(datePicker).toHaveLength(2);
  });

  ['Start date', 'End date'].forEach((placeholder) => {
    it(`should render range picker when ${placeholder} input is clicked`, () => {
      const { container } = renderResult;

      fireEvent.click(screen.getByPlaceholderText(placeholder));
      const datePicker = container.querySelectorAll(selectors.hiddenDatePicker);

      expect(datePicker).toHaveLength(1);
    });
  });

  it('should not render time-picker in range-picker when allday button is clicked', () => {
    const { container } = renderResult;

    fireEvent.click(screen.getByText('All day'));
    const timePicker = container.querySelector(selectors.timePicker);

    expect(timePicker).toBeNull();
  });
});
