import { h } from 'preact';
import Markup from 'preact-markup';
import isString from 'tui-code-snippet/type/isString';
import browser from 'tui-code-snippet/browser/browser';
import { identity } from '@src/util';
import { TemplateName } from '@src/template/default';
import ContextComponent from '@src/components/contextComponent';

interface Props {
  template: TemplateName;
  model: any;
}

// History
// Make this component as class component because of SSR(preact-render-to-string)
// Even if a component is function, the context is a property of this.
export class Template extends ContextComponent<Props> {
  render(props: Props) {
    const { template, model } = props;
    const { templates } = this.context;

    const templateFunc: Function = templates[template] || identity;
    const htmlOrVnode = templateFunc(model, h);

    if (isString(htmlOrVnode)) {
      if (browser.msie && browser.version === 9) {
        return <span dangerouslySetInnerHTML={{ __html: htmlOrVnode }} />;
      }

      return <Markup wrap={false} markup={htmlOrVnode} type="html" />;
    }

    return htmlOrVnode;
  }
}
