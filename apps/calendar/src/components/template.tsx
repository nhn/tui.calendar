import { FunctionComponent, h } from 'preact';
import Markup from 'preact-markup';

import { useStore } from '@src/components/hooks/store';

import isString from 'tui-code-snippet/type/isString';
import { identity } from '@src/util';
import { TemplateName } from '@src/template/default';

interface Props {
  template: TemplateName;
  model: any;
}

const Template: FunctionComponent<Props> = ({ template, model }) => {
  const { state: templates } = useStore('template');
  const templateFunc: Function = templates[template] || identity;
  const htmlOrVnode = templateFunc(model, h);

  return isString(htmlOrVnode) ? (
    <span
      dangerouslySetInnerHTML={{
        __html: htmlOrVnode,
      }}
    />
  ) : (
    htmlOrVnode
  );
};

export default Template;
