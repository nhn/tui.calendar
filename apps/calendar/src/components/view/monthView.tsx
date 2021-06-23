import { Fragment, FunctionComponent, h } from 'preact';

import FloatingLayer from '@src/components/floatingLayer';
import Month from '@src/components/view/month';

const MonthView: FunctionComponent = () => {
  return (
    <Fragment>
      <Month />
      <FloatingLayer />
    </Fragment>
  );
};

export default MonthView;
