import { h } from 'preact';
import DayNames from '@src/components/daygrid/dayNames';

export default { title: 'DayNames' };

export const oneDay = () => {
  const dayNames = [
    {
      name: 'Mon',
      dayIndex: 1,
    },
  ];

  return <DayNames dayNames={dayNames} />;
};

export const threeDays = () => {
  const dayNames = [
    {
      name: 'Mon',
      dayIndex: 1,
    },
    {
      name: 'Wed',
      dayIndex: 3,
    },
    {
      name: 'Fri',
      dayIndex: 5,
    },
  ];

  return <DayNames dayNames={dayNames} />;
};
