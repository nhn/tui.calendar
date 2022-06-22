import type { DeepRequired } from 'ts-essentials';

import type { CommonTheme, MonthTheme, WeekTheme } from '@t/theme';

export const DEFAULT_COMMON_THEME: DeepRequired<CommonTheme> = {
  border: '1px solid #e5e5e5',
  backgroundColor: 'white',
  holiday: {
    color: '#ff4040',
  },
  saturday: {
    color: '#333',
  },
  dayName: {
    color: '#333',
  },
  today: {
    color: '#fff',
  },
  gridSelection: {
    backgroundColor: 'rgba(81, 92, 230, 0.05)',
    border: '1px solid #515ce6',
  },
};

export const DEFAULT_WEEK_THEME: DeepRequired<WeekTheme> = {
  dayName: {
    borderLeft: 'none',
    borderTop: '1px solid #e5e5e5',
    borderBottom: '1px solid #e5e5e5',
    backgroundColor: 'inherit',
  },
  weekend: {
    backgroundColor: 'inherit',
  },
  today: {
    color: 'inherit',
    backgroundColor: 'rgba(81, 92, 230, 0.05)',
  },
  pastDay: {
    color: '#bbb',
  },
  panelResizer: {
    border: '1px solid #e5e5e5',
  },
  dayGrid: {
    borderRight: '1px solid #e5e5e5',
    backgroundColor: 'inherit',
  },
  dayGridLeft: {
    borderRight: '1px solid #e5e5e5',
    backgroundColor: 'inherit',
    width: '72px',
  },
  timeGrid: {
    borderRight: '1px solid #e5e5e5',
  },
  timeGridLeft: {
    backgroundColor: 'inherit',
    borderRight: '1px solid #e5e5e5',
    width: '72px',
  },
  timeGridLeftAdditionalTimezone: {
    backgroundColor: 'white',
  },
  timeGridHalfHourLine: {
    borderBottom: 'none',
  },
  timeGridHourLine: {
    borderBottom: '1px solid #e5e5e5',
  },
  nowIndicatorLabel: {
    color: '#515ce6',
  },
  nowIndicatorPast: {
    border: '1px dashed #515ce6',
  },
  nowIndicatorBullet: {
    backgroundColor: '#515ce6',
  },
  nowIndicatorToday: {
    border: '1px solid #515ce6',
  },
  nowIndicatorFuture: {
    border: 'none',
  },
  pastTime: {
    color: '#bbb',
  },
  futureTime: {
    color: '#333',
  },
  gridSelection: {
    color: '#515ce6',
  },
};

export const DEFAULT_MONTH_THEME: DeepRequired<MonthTheme> = {
  dayName: {
    borderLeft: 'none',
    backgroundColor: 'inherit',
  },
  holidayExceptThisMonth: {
    color: 'rgba(255, 64, 64, 0.4)',
  },
  dayExceptThisMonth: {
    color: 'rgba(51, 51, 51, 0.4)',
  },
  weekend: {
    backgroundColor: 'inherit',
  },
  moreView: {
    border: '1px solid #d5d5d5',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    width: null,
    height: null,
  },
  gridCell: {
    headerHeight: 31,
    footerHeight: null,
  },
  moreViewTitle: {
    backgroundColor: 'inherit',
  },
};
