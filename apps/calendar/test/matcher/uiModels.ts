import EventModel from '@src/model/eventModel';

expect.extend({
  toEqualUIModelByTitle(actual: Record<string, EventModel[]>, expected: Record<string, string[]>) {
    const result = {
      pass: false,
      message: () => '',
    };
    let isEqual = true;

    Object.keys(expected).findIndex((ymd) => {
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
