import { FunctionComponent, h } from 'preact';

import isString from 'tui-code-snippet/type/isString';

import { useStore } from '@src/contexts/calendarStore';
import { templateSelector } from '@src/selectors';
import { TemplateName } from '@src/template/default';

interface Props {
  template: TemplateName;
  model: any;
}

function identity(value: unknown) {
  return value;
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
