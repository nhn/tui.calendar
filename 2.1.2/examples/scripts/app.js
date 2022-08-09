/* eslint-disable no-var,prefer-destructuring,prefer-template,no-undef,object-shorthand,no-console */
// for testing IE11 compatibility, this file doesn't use ES6 syntax.
(function (Calendar) {
  var cal;
  // Constants
  var CALENDAR_CSS_PREFIX = 'toastui-calendar-';
  var cls = function (className) {
    return CALENDAR_CSS_PREFIX + className;
  };

  // Elements
  var navbarRange = $('.navbar--range');
  var prevButton = $('.prev');
  var nextButton = $('.next');
  var todayButton = $('.today');
  var dropdown = $('.dropdown');
  var dropdownTrigger = $('.dropdown-trigger');
  var dropdownTriggerIcon = $('.dropdown-icon');
  var dropdownContent = $('.dropdown-content');
  var checkboxCollapse = $('.checkbox-collapse');
  var sidebar = $('.sidebar');

  // App State
  var appState = {
    activeCalendarIds: MOCK_CALENDARS.map(function (calendar) {
      return calendar.id;
    }),
    isDropdownActive: false,
  };

  // functions to handle calendar behaviors
  function reloadEvents() {
    var randomEvents;

    cal.clear();
    randomEvents = generateRandomEvents(
      cal.getViewName(),
      cal.getDateRangeStart(),
      cal.getDateRangeEnd()
    );
    cal.createEvents(randomEvents);
  }

  function getReadableViewName(viewType) {
    switch (viewType) {
      case 'month':
        return 'Monthly';
      case 'week':
        return 'Weekly';
      case 'day':
        return 'Daily';
      default:
        throw new Error('no view type');
    }
  }

  function displayRenderRange() {
    var rangeStart = cal.getDateRangeStart();
    var rangeEnd = cal.getDateRangeEnd();

    navbarRange.textContent = getNavbarRange(rangeStart, rangeEnd, cal.getViewName());
  }

  function setDropdownTriggerText() {
    var viewName = cal.getViewName();
    var buttonText = $('.dropdown .button-text');
    buttonText.textContent = getReadableViewName(viewName);
  }

  function toggleDropdownState() {
    appState.isDropdownActive = !appState.isDropdownActive;
    dropdown.classList.toggle('is-active', appState.isDropdownActive);
    dropdownTriggerIcon.classList.toggle(cls('open'), appState.isDropdownActive);
  }

  function setAllCheckboxes(checked) {
    var checkboxes = $$('.sidebar-item > input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
      checkbox.checked = checked;
      setCheckboxBackgroundColor(checkbox);
    });
  }

  function setCheckboxBackgroundColor(checkbox) {
    var calendarId = checkbox.value;
    var label = checkbox.nextElementSibling;
    var calendarInfo = MOCK_CALENDARS.find(function (calendar) {
      return calendar.id === calendarId;
    });

    if (!calendarInfo) {
      calendarInfo = {
        backgroundColor: '#2a4fa7',
      };
    }

    label.style.setProperty(
      '--checkbox-' + calendarId,
      checkbox.checked ? calendarInfo.backgroundColor : '#fff'
    );
  }

  function update() {
    setDropdownTriggerText();
    displayRenderRange();
    reloadEvents();
  }

  function bindAppEvents() {
    dropdownTrigger.addEventListener('click', toggleDropdownState);

    prevButton.addEventListener('click', function () {
      cal.prev();
      update();
    });

    nextButton.addEventListener('click', function () {
      cal.next();
      update();
    });

    todayButton.addEventListener('click', function () {
      cal.today();
      update();
    });

    dropdownContent.addEventListener('click', function (e) {
      var targetViewName;

      if ('viewName' in e.target.dataset) {
        targetViewName = e.target.dataset.viewName;
        cal.changeView(targetViewName);
        checkboxCollapse.disabled = targetViewName === 'month';
        toggleDropdownState();
        update();
      }
    });

    checkboxCollapse.addEventListener('change', function (e) {
      if ('checked' in e.target) {
        cal.setOptions({
          week: {
            collapseDuplicateEvents: !!e.target.checked,
          },
          useDetailPopup: !e.target.checked,
        });
      }
    });

    sidebar.addEventListener('click', function (e) {
      if ('value' in e.target) {
        if (e.target.value === 'all') {
          if (appState.activeCalendarIds.length > 0) {
            cal.setCalendarVisibility(appState.activeCalendarIds, false);
            appState.activeCalendarIds = [];
            setAllCheckboxes(false);
          } else {
            appState.activeCalendarIds = MOCK_CALENDARS.map(function (calendar) {
              return calendar.id;
            });
            cal.setCalendarVisibility(appState.activeCalendarIds, true);
            setAllCheckboxes(true);
          }
        } else if (appState.activeCalendarIds.indexOf(e.target.value) > -1) {
          appState.activeCalendarIds.splice(appState.activeCalendarIds.indexOf(e.target.value), 1);
          cal.setCalendarVisibility(e.target.value, false);
          setCheckboxBackgroundColor(e.target);
        } else {
          appState.activeCalendarIds.push(e.target.value);
          cal.setCalendarVisibility(e.target.value, true);
          setCheckboxBackgroundColor(e.target);
        }
      }
    });
  }

  function bindInstanceEvents() {
    cal.on({
      clickMoreEventsBtn: function (btnInfo) {
        console.log('clickMoreEventsBtn', btnInfo);
      },
      clickEvent: function (eventInfo) {
        console.log('clickEvent', eventInfo);
      },
      clickDayName: function (dayNameInfo) {
        console.log('clickDayName', dayNameInfo);
      },
      selectDateTime: function (dateTimeInfo) {
        console.log('selectDateTime', dateTimeInfo);
      },
      beforeCreateEvent: function (event) {
        console.log('beforeCreateEvent', event);
        event.id = chance.guid();

        cal.createEvents([event]);
        cal.clearGridSelections();
      },
      beforeUpdateEvent: function (eventInfo) {
        var event, changes;

        console.log('beforeUpdateEvent', eventInfo);

        event = eventInfo.event;
        changes = eventInfo.changes;

        cal.updateEvent(event.id, event.calendarId, changes);
      },
      beforeDeleteEvent: function (eventInfo) {
        console.log('beforeDeleteEvent', eventInfo);

        cal.deleteEvent(eventInfo.id, eventInfo.calendarId);
      },
    });
  }

  function initCheckbox() {
    var checkboxes = $$('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
      setCheckboxBackgroundColor(checkbox);
    });
  }

  function getEventTemplate(event, isAllday) {
    var html = [];
    var start = moment(event.start.toDate().toUTCString());
    if (!isAllday) {
      html.push('<strong>' + start.format('HH:mm') + '</strong> ');
    }

    if (event.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(' Private');
    } else {
      if (event.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (event.attendees.length > 0) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (event.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(' ' + event.title);
    }

    return html.join('');
  }

  // Calendar instance with options
  // eslint-disable-next-line no-undef
  cal = new Calendar('#app', {
    calendars: MOCK_CALENDARS,
    useFormPopup: true,
    useDetailPopup: true,
    eventFilter: function (event) {
      var currentView = cal.getViewName();
      if (currentView === 'month') {
        return ['allday', 'time'].includes(event.category) && event.isVisible;
      }

      return event.isVisible;
    },
    template: {
      allday: function (event) {
        return getEventTemplate(event, true);
      },
      time: function (event) {
        return getEventTemplate(event, false);
      },
    },
  });

  // Init
  bindInstanceEvents();
  bindAppEvents();
  initCheckbox();
  update();
})(tui.Calendar);
