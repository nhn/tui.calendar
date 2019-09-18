import { h } from 'preact';
import Base from '@src/base';

/**
 * @class Month month view
 */
export default class Month extends Base {
  protected getComponent(): JSX.Element {
    return <h2>Month View</h2>;
  }
}
