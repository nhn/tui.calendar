import { h } from 'preact';
import ContextComponent from '@src/components/contextComponent';
import { cls } from '@src/util/cssHelper';

const prefix = 'timegrid-';
export const prefixer = (selector: string) => cls(selector, prefix);

export default class TimeGrid extends ContextComponent {
  render() {
    return <h1>TimeGrid</h1>;
  }
}
TimeGrid.displayName = 'TimeGrid';
