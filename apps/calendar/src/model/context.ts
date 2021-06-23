import { createContext } from 'preact';
import { AppContext } from '.';
import { createScheduleCollection } from '@src/controller/base';
import Theme from '@src/theme';
import { registerTemplateConfig } from '@src/template';
import { EventHandler } from '@src/event';
import { InternalEventName } from '@src/event/internalEventType';
import { ExternalEventName } from '@src/event/externalEventType';

export function getNewAppContext() {
  const appContext: AppContext = {
    options: {},
    dataStore: {
      calendars: [],
      schedules: createScheduleCollection(),
      idsOfDay: {},
    },
    templates: registerTemplateConfig(),
    internalEvent: new EventHandler<InternalEventName>(),
    externalEvent: new EventHandler<ExternalEventName>(),
  };

  return appContext;
}

export const InstanceContext = createContext<AppContext>(getNewAppContext());
