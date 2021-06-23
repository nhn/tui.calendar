import { Fragment, FunctionComponent, h } from 'preact';

import FloatingLayer from '@src/components/floatingLayer';
import Week from '@src/components/view/week';

const WeekView: FunctionComponent = () => (
  <Fragment>
    <Week />
    <FloatingLayer />
  </Fragment>
);

export default WeekView;
