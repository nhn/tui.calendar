import { h } from 'preact';
import Markup from 'preact-markup';
import isString from 'tui-code-snippet/type/isString';
import { noop } from '@src/util';
import ContextComponent from '@src/components/contextComponent';

interface Props {
  template: string;
  model: any;
}

// History
// Make this component as class component because of SSR(preact-render-to-string)
// Even if a component is function, the context is a property of this.
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
