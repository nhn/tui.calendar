import { FunctionComponent, h } from 'preact';

import isString from 'tui-code-snippet/type/isString';

import { useStore } from '@src/contexts/calendarStore';
import { templateSelector } from '@src/selectors';
import { TemplateName } from '@src/template/default';
import { identity } from '@src/util/utils';

interface Props {
  template: TemplateName;
  model: any;
}

const Template: FunctionComponent<Props> = ({ template, model }) => {
  const templates = useStore(templateSelector);
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
