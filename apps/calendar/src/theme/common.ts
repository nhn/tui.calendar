import { ThemeState } from '@t/theme';

export function createCommonTheme(): { common: Required<ThemeState['common']> } {
  return {
    common: {
      border: '1px solid #e5e5e5',
      backgroundColor: 'white',
      holiday: {
        color: '#ff4040',
      },
      saturday: {
        color: '#333',
      },
      dayname: {
        color: '#333',
      },
      today: {
        color: '#333',
      },
      gridSelection: {
        backgroundColor: 'rgba(81, 92, 230, 0.05)',
        border: '1px solid #515ce6',
      },
    },
  };
}
