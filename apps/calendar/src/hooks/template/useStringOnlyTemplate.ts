import { useStore } from '@src/contexts/calendarStore';
import { templateSelector } from '@src/selectors';
import type { TemplateName } from '@src/template/default';
import { isNil, isString } from '@src/utils/type';

export function useStringOnlyTemplate({
  template,
  model,
  defaultValue = '',
}: {
  template: TemplateName;
  model?: any;
  defaultValue?: string;
}) {
  const templates = useStore(templateSelector);
  const templateFunc: Function = templates[template];

  if (isNil(templateFunc)) {
    return defaultValue;
  }

  let result = templateFunc(model);
  if (!isString(result)) {
    result = defaultValue;
  }

  return result;
}
