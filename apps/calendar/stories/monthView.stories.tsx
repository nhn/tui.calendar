import { h } from 'preact';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import MonthView from '@src/components/view/monthView';

export default { title: 'MonthView' };

export const basic = () => {
  return (
    <ProviderWrapper>
      <MonthView />
    </ProviderWrapper>
  );
};

export const narrowWeekend = () => {
  return (
    <ProviderWrapper options={{ month: { narrowWeekend: true } }}>
      <MonthView />
    </ProviderWrapper>
  );
};

export const startDayOfWeek = () => {
  return (
    <ProviderWrapper options={{ month: { startDayOfWeek: 1 } }}>
      <MonthView />
    </ProviderWrapper>
  );
};

export const daynames = () => {
  return (
    <ProviderWrapper options={{ month: { daynames: ['일', '월', '화', '수', '목', '금', '토'] } }}>
      <MonthView />
    </ProviderWrapper>
  );
};

export const workweek = () => {
  return (
    <ProviderWrapper options={{ month: { workweek: true } }}>
      <MonthView />
    </ProviderWrapper>
  );
};

export const twoWeeks = () => {
  return (
    <ProviderWrapper options={{ month: { visibleWeeksCount: 2 } }}>
      <MonthView />
    </ProviderWrapper>
  );
};
