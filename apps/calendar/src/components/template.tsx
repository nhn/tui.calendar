import { h } from 'preact';

import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { templateSelector } from '@src/selectors';
import { TemplateName } from '@src/template/default';
import { sanitize } from '@src/utils/sanitizer';
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
    <div
      className={cls(`template-${template}`)}
      dangerouslySetInnerHTML={{
        __html: sanitize(htmlOrVnode),
      }}
    />
  ) : (
    htmlOrVnode
  );
}
