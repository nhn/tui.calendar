import forEach from 'tui-code-snippet/collection/forEach';

import Schedule from '@src/model/schedule';

expect.extend({
  toEqualViewModelByTitle(actual: Record<string, Schedule[]>, expected: Record<string, string[]>) {
    const result = {
      pass: false,
      message: () => '',
    };
    let isEqual = true;

    forEach(expected, (_compareTo: any, ymd: string) => {
      const models = actual[ymd];

      if (!models) {
        isEqual = false;

        return false;
      }

      const titleList = models.map((item) => item.title);

      isEqual = this.equals(titleList.sort(), expected[ymd].sort());

      return isEqual;
    });

    result.pass = isEqual;

    return result;
  },
});
