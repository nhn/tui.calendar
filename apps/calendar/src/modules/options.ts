import { Option } from '@src/model';
import { InitStoreData } from '@t/store';

const options = {
  name: 'options',
  state: (initStoreData: InitStoreData) => ({ options: { ...initStoreData.options } } as Option),
};

export default options;
