import forEach from 'tui-code-snippet/collection/forEach';
import Schedule from '@src/model/schedule';

export default {
  toEqualViewModel(matchersUtil: jasmine.MatchersUtil) {
    return {
      compare(
        actual: Record<string, Schedule[]>,
        expected: Record<string, Schedule[]>
      ): jasmine.CustomMatcherResult {
        const result: jasmine.CustomMatcherResult = {
          pass: false,
        };
        let isEqual = true;

        forEach(expected, function (_compareTo: any, ymd: string) {
          const models: Schedule[] = actual[ymd];

          if (!models) {
            isEqual = false;

            return false;
          }

          const titleList = models.map((item: Schedule) => {
            return item.title;
          });

          isEqual = matchersUtil.equals(titleList.sort(), expected[ymd].sort());

          return isEqual;
        });

        result.pass = isEqual;

        return result;
      },
    };
  },
};
