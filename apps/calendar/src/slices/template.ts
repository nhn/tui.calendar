import { templates } from '@src/template/default';

import { Template, TemplateConfig } from '@t/template';

export type TemplateSlice = { template: Template };

export function createTemplateSlice(templateConfig: TemplateConfig = {}): TemplateSlice {
  return {
    template: {
      ...templates,
      ...templateConfig,
    },
  };
}
