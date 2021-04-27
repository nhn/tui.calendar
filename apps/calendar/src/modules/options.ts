import { deepMergedCopy } from '@src/util/utils';
import { Option } from '@src/model';
import { InitStoreData } from '@t/store';

const optionsData = {
  name: 'options',
  state: ({ options }: InitStoreData) => ({ options: deepMergedCopy({}, options) } as Option),
};

export default optionsData;
