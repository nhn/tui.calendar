/**
 * @fileoverview TOAST UI Calendar React wrapper component
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */
import React from 'react';
import TuiCalendar from 'tui-calendar';

/**
 * Calendar's options prop
 * @type {string[]}
 */
const optionProps = [
  'disableDblClick',
  'isReadOnly',
  'month',
  'scheduleView',
  'taskView',
  'theme',
  'timezones',
  'week',
  'template'
];

export default class Calendar extends React.Component {
  rootEl = React.createRef();

  static defaultProps = {
    height: '800px',
    view: 'week'
  };

  calendarInst = null;

  componentDidMount() {
    const {schedules = [], view} = this.props;

    this.calendarInst = new TuiCalendar(this.rootEl.current, {
      ...this.props,
      defaultView: view
    });

    this.setSchedules(schedules);

    this.bindEventHandlers(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const {calendars, height, schedules, theme, view} = this.props;

    if (height !== nextProps.height) {
      this.getRootElement().style.height = height;
    }

    if (calendars !== nextProps.calendars) {
      this.setCalendars(nextProps.calendars);
    }

    if (schedules !== nextProps.schedules) {
      this.calendarInst.clear();
      this.setSchedules(nextProps.schedules);
    }

    if (theme !== nextProps.theme) {
      this.calendarInst.setTheme(this.cloneData(nextProps.theme));
    }

    if (view !== nextProps.view) {
      this.calendarInst.changeView(nextProps.view);
    }

    optionProps.forEach((key) => {
      if (this.props[key] !== nextProps[key]) {
        this.setOptions(key, nextProps[key]);
      }
    });

    this.bindEventHandlers(nextProps, this.props);

    return false;
  }

  componentWillUnmount() {
    this.calendarInst.destroy();
  }

  cloneData(data) {
    return JSON.parse(JSON.stringify(data));
  }

  setCalendars(calendars) {
    if (calendars && calendars.length) {
      this.calendarInst.setCalendars(calendars);
    }
  }

  setSchedules(schedules) {
    if (schedules && schedules.length) {
      this.calendarInst.createSchedules(schedules);
    }
  }

  setOptions(propKey, prop) {
    this.calendarInst.setOptions({[propKey]: prop});
  }

  getInstance() {
    return this.calendarInst;
  }

  getRootElement() {
    return this.rootEl.current;
  }

  bindEventHandlers = (props) => {
    const eventHandlerNames = Object.keys(props).filter((key) => /^on[A-Z][a-zA-Z]+/.test(key));

    eventHandlerNames.forEach((key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);
      this.calendarInst.off(eventName);
      this.calendarInst.on(eventName, props[key]);
    });
  };

  render() {
    return <div ref={this.rootEl} style={{height: this.props.height}} />;
  }
}
