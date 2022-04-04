import { LocalDate, MomentDate, UTCDate } from '@toast-ui/date';
import moment from 'moment-timezone';

import Calendar from '@src/factory/calendar';
import { setDateConstructor } from '@src/time/timezone';

describe('Calendar', () => {
  describe('Timezone', () => {
    beforeEach(() => {
      MomentDate.setMoment(moment);
    });

    afterEach(() => {
      setDateConstructor(LocalDate);
    });

    it('can set custom timezone by UTC', () => {
      const now = new Date();
      const calendar = new Calendar(document.createElement('div'), {
        timezone: {
          dateConstructor: UTCDate,
        },
      });
      calendar.setDate(now);

      expect(calendar.getDateInterface() instanceof UTCDate).toBe(true);
      expect(now).toBeSameDate(calendar.getDate());
    });

    it('use LocalDate as a default', () => {
      const now = new Date();
      const calendar = new Calendar(document.createElement('div'));
      calendar.setDate(now);

      expect(calendar.getDateInterface() instanceof LocalDate).toBe(true);
      expect(now).toBeSameDate(calendar.getDate());
    });

    it('can set custom timezone offset and name by MomentDate', () => {
      const now = new Date();
      const calendar = new Calendar(document.createElement('div'), {
        timezone: {
          dateConstructor: MomentDate,
        },
      });
      calendar.setDate(now);

      expect(calendar.getDateInterface() instanceof MomentDate).toBe(true);
      expect(now).toBeSameDate(calendar.getDate());
    });

    it('can set custom timezone offset UTC+0 by MomentDate', () => {
      const now = new Date();
      const calendar = new Calendar(document.createElement('div'), {
        timezone: {
          dateConstructor: MomentDate,
          offset: 0,
        },
      });
      calendar.setDate(now);

      expect(now).toBeSameDate(calendar.getDate());
    });

    it('can set custom timezone name "America/Los_Angeles" by MomentDate', () => {
      const calendar = new Calendar(document.createElement('div'), {
        timezone: {
          dateConstructor: MomentDate,
          name: 'America/Los_Angeles',
        },
      });

      // PDT
      let now = new Date('2020-06-01T00:00:00');
      calendar.setDate(now);

      expect(now).toBeSameDate(calendar.getDate());
      expect(calendar.getDateInterface().getTimezoneOffset()).toBe(420);

      // PST
      now = new Date('2020-12-01T00:00:00');
      calendar.setDate(now);

      expect(now).toBeSameDate(calendar.getDate());
      expect(calendar.getDateInterface().getTimezoneOffset()).toBe(480);
    });
  });
});
