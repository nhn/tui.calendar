import { cloneElement, createElement } from 'preact';

import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { templateSelector } from '@src/selectors';
import type { TemplateName } from '@src/template/default';
import { sanitize } from '@src/utils/sanitizer';
import { isNil, isString } from '@src/utils/type';

import type { TemplateReturnType } from '@t/template';

interface Props {
  template: TemplateName;
  param?: any;
  as?: keyof HTMLElementTagNameMap;
}

export function Template({ template, param, as: tagName = 'div' }: Props) {
  const templates = useStore(templateSelector);
  const templateFunc: Function = templates[template];

  if (isNil(templateFunc)) {
    return null;
  }

  const htmlOrVnode: TemplateReturnType = templateFunc(param);

  return isString(htmlOrVnode)
    ? createElement(tagName, {
        className: cls(`template-${template}`),
        dangerouslySetInnerHTML: {
          __html: sanitize(htmlOrVnode),
        },
      })
    : cloneElement(htmlOrVnode, {
        className: `${htmlOrVnode.props.className ?? ''} ${cls(`template-${template}`)}`,
      });
}
