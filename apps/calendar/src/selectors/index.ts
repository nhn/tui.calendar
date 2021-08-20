import { pick } from '@src/util/utils';

import { CalendarStore } from '@t/store';

export function topLevelStateSelector<Group extends keyof CalendarStore>(
  group: Group
): (state: CalendarStore) => CalendarStore[Group] {
  return (state: CalendarStore) => state[group];
}

export const weekViewStateSelector = (state: CalendarStore) =>
  pick(state, 'template', 'option', 'calendar', 'weekViewLayout');
