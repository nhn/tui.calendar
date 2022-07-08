import produce from 'immer';

import { templates } from '@src/template/default';

import type { CalendarState, CalendarStore, SetState } from '@t/store';
import type { Template, TemplateConfig } from '@t/template';

export type TemplateSlice = { template: Template };

export type TemplateDispatchers = {
  setTemplate: (template: TemplateConfig) => void;
};

export function createTemplateSlice(templateConfig: TemplateConfig = {}): TemplateSlice {
  return {
    template: {
      ...templates,
      ...templateConfig,
    },
  };
}

export function createTemplateDispatchers(set: SetState<CalendarStore>): TemplateDispatchers {
  return {
    setTemplate: (template: TemplateConfig) =>
      set(
        produce<CalendarState>((state) => {
          state.template = {
            ...state.template,
            ...template,
          };
        })
      ),
  };
}
