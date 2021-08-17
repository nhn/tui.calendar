import { Template, TemplateConfig } from '@src/model';
import { templates } from '@src/template/default';

export type TemplateSlice = { template: Template };

export function createTemplateSlice(templateConfig: TemplateConfig = {}): TemplateSlice {
  return {
    template: {
      ...templates,
      ...templateConfig,
    },
  };
}
