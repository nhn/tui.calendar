import { registerTemplateConfig } from '@src/template';
import { InitStoreData } from '@t/store';

const template = {
  name: 'template',
  state: ({ options }: InitStoreData) => registerTemplateConfig(options?.template),
};

export default template;
