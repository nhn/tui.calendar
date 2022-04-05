import { ThemeState } from '@t/theme';

export function createMonthTheme(): { month: Required<ThemeState>['month'] } {
  return {
    month: {
      dayname: {
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
      },
      moreViewTitle: {
        backgroundColor: 'inherit',
      },
    },
  };
}
