import Base from '@src/base';
import { h } from 'preact';

/**
 * @class Month month view
 */
export default class Week extends Base {
  protected getComponent(): JSX.Element {
    return <h2>Week View</h2>;
  }
}
