import { registerTemplateConfig } from '@src/template';

import { InitStoreData } from '@t/store';

export const template = {
  name: 'template',
  state: ({ options }: InitStoreData) => registerTemplateConfig(options?.template),
};
