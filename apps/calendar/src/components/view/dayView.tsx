import { Fragment, FunctionComponent, h } from 'preact';

import Day from '@src/components/view/day';
import FloatingLayer from '@src/components/floatingLayer';

const DayView: FunctionComponent = () => (
  <Fragment>
    <Day />
    <FloatingLayer />
  </Fragment>
);

export default DayView;
