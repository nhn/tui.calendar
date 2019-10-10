import { h } from 'preact';
import { ContextComponent } from '@src/components/hoc';
import Markup from 'preact-markup';
import isString from 'tui-code-snippet/type/isString';
import { noop } from '@src/util';

interface Props {
  template: string;
  model: any;
}

export class Template extends ContextComponent<Props> {
  render(props: Props) {
    const { template, model } = props;
    const { templates } = this.context;

    const templateFunc = templates[template] || noop;
    const htmlOrVnode = templateFunc(model, h);

    return isString(htmlOrVnode) ? (
      <Markup wrap={false} markup={htmlOrVnode} allow-events />
    ) : (
      htmlOrVnode
    );
  }
}
