import { Template, TemplateConfig } from '@src/model';
import { templates } from '@src/template/default';

export type TemplateSlice = Template;

export function createTemplateSlice(templateConfig: TemplateConfig = {}): TemplateSlice {
  return {
    ...templates,
    ...templateConfig,
  };
}
