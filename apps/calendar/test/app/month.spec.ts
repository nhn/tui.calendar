import Month from '@src/factory/month';
import * as Store from '@src/components/hooks/store';

describe('View/Month', () => {
  it('Month view', () => {
    jest.spyOn(Store, 'useStore').mockReturnValue({
      state: {},
      actions: {},
    });
    // import test
    const month = new Month(document.createElement('div'));

    expect(month.render() instanceof Month).toBe(true);
  });
});
