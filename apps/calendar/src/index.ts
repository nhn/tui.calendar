import Calendar from '@src/factory/calendar';
import Day from '@src/factory/day';
import Month from '@src/factory/month';
import Week from '@src/factory/week';
import TZDate from '@src/time/date';

import type { ExternalEventTypes } from '@t/eventBus';
import type { EventObjectWithDefaultValues } from '@t/events';
import type { Options } from '@t/options';

export default Calendar;

export { Day, Month, TZDate, Week };
export type { EventObjectWithDefaultValues as EventObject, ExternalEventTypes, Options };
