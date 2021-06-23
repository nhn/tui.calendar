import { Fragment, FunctionComponent, h } from 'preact';

import FloatingLayer from '@src/components/floatingLayer';
import Day from '@src/components/view/day';

const DayView: FunctionComponent = () => (
  <Fragment>
    <Day />
    <FloatingLayer />
  </Fragment>
);

export default DayView;
