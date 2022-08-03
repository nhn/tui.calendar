import { h } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';

import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import { initCalendarStore, useDispatch } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { cls } from '@src/helpers/css';
import { fireEvent, render, screen, userEvent } from '@src/test/utils';
import TZDate from '@src/time/date';

import type { Options } from '@t/options';

const selectors = {
  calendarSection: `.${cls('calendar-section')}`,
  privateButton: `.${cls('popup-section-private')}.${cls('popup-button')}`,
  privateIcon: `.${cls('ic-private')}`,
  hiddenDatePicker: `.${cls('datepicker-container')} .tui-datepicker.tui-hidden`,
  timePicker: '.tui-datepicker-footer .tui-timepicker',
};

describe('event form popup', () => {
  const start = new TZDate();
  const end = new TZDate();
  const isAllday = false;
  const isPrivate = false;
  const state = 'Busy';
  const mockFn = jest.fn();

  const Component = () => {
    const eventBus = useEventBus();
    const { showFormPopup } = useDispatch('popup');
    const mockHandler = useCallback(mockFn, [mockFn]);

    useEffect(() => {
      eventBus.on('beforeCreateEvent', mockHandler);
      showFormPopup({
        isCreationPopup: true,
        title: '',
        location: '',
        start,
        end,
        isAllday,
        isPrivate,
        eventState: state,
        popupArrowPointPosition: {
          top: 0,
          left: 0,
        },
      });
    }, [eventBus, mockHandler, showFormPopup]);

    return <EventFormPopup />;
  };

  const setup = (calendars?: Options['calendars']) => {
    const store = initCalendarStore({ calendars });

    return render(<Component />, { store });
  };

  it('should display CalendarSelector when `calendars` is exists', () => {
    const calendars = [{ id: '1', name: 'calendar name' }];

    setup(calendars);

    const calendarSelectorContent = screen.getByRole('button', { name: calendars[0].name });

    expect(calendarSelectorContent).not.toBeNull();
  });

  it('should be able to select calendar', () => {
    const calendars = [
      {
        id: '1',
        name: 'Personal',
      },
      {
        id: '2',
        name: 'Work',
      },
    ];

    setup(calendars);

    let calendarSelectorButton = screen.getByRole('button', { name: calendars[0].name });
    fireEvent.click(calendarSelectorButton);
    fireEvent.click(screen.getByText('Work'));

    calendarSelectorButton = screen.getByRole('button', { name: calendars[1].name });
    expect(calendarSelectorButton).toBeInTheDocument();

    fireEvent.click(calendarSelectorButton);
    fireEvent.click(screen.getByText('Personal'));

    calendarSelectorButton = screen.getByRole('button', { name: calendars[0].name });
    expect(calendarSelectorButton).toBeInTheDocument();
  });

  it('should not display CalendarSelector when `calendars` is not exists', () => {
    const { container } = setup();

    const calendarSelector = container.querySelector(selectors.calendarSection);

    expect(calendarSelector).toBeNull();
  });

  it('should be changed private icon when private button is clicked', () => {
    const { container } = setup();

    const privateButton = container.querySelector(selectors.privateButton) ?? container;
    let privateIcon = container.querySelector(selectors.privateIcon);

    expect(privateButton).not.toBeNull();
    expect(privateIcon).toBeNull();

    fireEvent.click(privateButton);

    privateIcon = container.querySelector(selectors.privateIcon);

    expect(privateIcon).not.toBeNull();
  });

  it('should render range-picker but range-picker is hidden', () => {
    const { container } = setup();

    const datePicker = container.querySelectorAll(selectors.hiddenDatePicker);

    expect(datePicker).toHaveLength(2);
  });

  ['Start date', 'End date'].forEach((placeholder) => {
    it(`should render range picker when ${placeholder} input is clicked`, () => {
      const { container } = setup();

      fireEvent.click(screen.getByPlaceholderText(placeholder));
      const datePicker = container.querySelectorAll(selectors.hiddenDatePicker);

      expect(datePicker).toHaveLength(1);
    });
  });

  it('should not render time-picker in range-picker when allday button is clicked', () => {
    const { container } = setup();

    fireEvent.click(screen.getByText('All day'));
    const timePicker = container.querySelector(selectors.timePicker);

    expect(timePicker).toBeNull();
  });

  it('should fire `beforeCreateEvent` custom event when save button is clicked', () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    expect(mockFn).toBeCalled();
    expect(mockFn).toHaveBeenCalledWith({
      start,
      end,
      isAllday,
      isPrivate,
      state,
      title: '',
      location: '',
    });
  });

  it('should fire `beforeCreateEvent` custom event with changed values when save button is clicked', () => {
    const changedTitle = 'changed title';
    const changedLocation = 'changed location';

    setup();

    fireEvent.change(screen.getByPlaceholderText('Subject'), { target: { value: changedTitle } });
    fireEvent.change(screen.getByPlaceholderText('Location'), {
      target: { value: changedLocation },
    });
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    expect(mockFn).toHaveBeenCalledWith({
      start,
      end,
      isAllday,
      isPrivate,
      state,
      title: changedTitle,
      location: changedLocation,
    });
  });

  // Regression tests for #1233
  it('should preserve input values when "All day" checkbox is toggled', async () => {
    // Given
    setup();
    const user = userEvent.setup();
    const getTitleInput = (): HTMLInputElement => screen.getByPlaceholderText('Subject');
    const getLocationInput = (): HTMLInputElement => screen.getByPlaceholderText('Location');
    const allDayCheckbox = screen.getByText('All day');

    const givenTitle = 'title';
    const givenLocation = 'location';

    await user.type(getTitleInput(), givenTitle);
    await user.type(getLocationInput(), givenLocation);

    // When
    await user.click(allDayCheckbox);

    // Then
    expect(getTitleInput().value).toBe(givenTitle);
    expect(getLocationInput().value).toBe(givenLocation);

    // When change input and toggle again
    const concatStr = ' changed';
    await user.type(getTitleInput(), concatStr);
    await user.type(getLocationInput(), concatStr);
    await user.click(allDayCheckbox);

    // Then
    expect(getTitleInput().value).toBe(`${givenTitle}${concatStr}`);
    expect(getLocationInput().value).toBe(`${givenLocation}${concatStr}`);
  });

  it('should preserve input values when selecting calendar', async () => {
    // Given
    const calendars = [
      {
        id: '1',
        name: 'Personal',
      },
      {
        id: '2',
        name: 'Work',
      },
    ];
    setup(calendars);

    const user = userEvent.setup();
    const getTitleInput = (): HTMLInputElement => screen.getByPlaceholderText('Subject');
    const getLocationInput = (): HTMLInputElement => screen.getByPlaceholderText('Location');

    const givenTitle = 'title';
    const givenLocation = 'location';

    await user.type(getTitleInput(), givenTitle);
    await user.type(getLocationInput(), givenLocation);

    // When
    await user.click(screen.getByRole('button', { name: calendars[0].name }));
    await user.click(screen.getByText(calendars[1].name));

    // Then
    expect(getTitleInput().value).toBe(givenTitle);
    expect(getLocationInput().value).toBe(givenLocation);

    // When change input and toggle again
    const concatStr = ' changed';
    await user.type(getTitleInput(), concatStr);
    await user.type(getLocationInput(), concatStr);
    await user.click(screen.getByRole('button', { name: calendars[1].name }));
    await user.click(screen.getByText(calendars[0].name));

    // Then
    expect(getTitleInput().value).toBe(`${givenTitle}${concatStr}`);
    expect(getLocationInput().value).toBe(`${givenLocation}${concatStr}`);
  });
});
