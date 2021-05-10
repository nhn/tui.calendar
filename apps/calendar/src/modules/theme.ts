import Theme from '@src/theme';
import { InitStoreData } from '@t/store';

const theme = {
  name: 'theme',
  state: ({ options }: InitStoreData) => new Theme(options.theme),
};

export default theme;
