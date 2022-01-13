import { h } from 'preact';

import { useStore } from '@src/contexts/calendarStore';
import { templateSelector } from '@src/selectors';
import { TemplateName } from '@src/template/default';
import { isString } from '@src/utils/type';

interface Props {
  template: TemplateName;
  model: any;
}

function identity(value: unknown) {
  return value;
}

export function Template({ template, model }: Props) {
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
}
