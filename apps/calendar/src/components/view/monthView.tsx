import { h, Fragment, FunctionComponent } from 'preact';

import Month from '@src/components/view/month';
import FloatingLayer from '@src/components/floatingLayer';

const MonthView: FunctionComponent = () => {
  return (
    <Fragment>
      <Month />
      <FloatingLayer />
    </Fragment>
  );
};

export default MonthView;
