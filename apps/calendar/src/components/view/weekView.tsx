import { Fragment, FunctionComponent, h } from 'preact';

import Week from '@src/components/view/week';
import FloatingLayer from '@src/components/floatingLayer';

const WeekView: FunctionComponent = () => (
  <Fragment>
    <Week />
    <FloatingLayer />
  </Fragment>
);

export default WeekView;
