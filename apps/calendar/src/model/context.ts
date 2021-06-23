import { createContext } from 'preact';

import { createScheduleCollection } from '@src/controller/base';
import { EventHandler } from '@src/event';
import { ExternalEventName } from '@src/event/externalEventType';
import { InternalEventName } from '@src/event/internalEventType';
import { registerTemplateConfig } from '@src/template';
import Theme from '@src/theme';

import { AppContext } from '.';

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
