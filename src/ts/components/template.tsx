import { h } from 'preact';
import Markup from 'preact-markup';
import isString from 'tui-code-snippet/type/isString';
import { noop } from '@src/util';
import { AppContext } from '@src/model';

interface Props {
  template: string;
  model: any;
}

export function Template(props: Props, context: AppContext) {
  const { template, model } = props;
  const { templates } = context;

  const templateFunc = templates[template] || noop;
  const htmlOrVnode = templateFunc(model, h);

  return isString(htmlOrVnode) ? (
    <Markup wrap={false} markup={htmlOrVnode} allow-events />
  ) : (
    htmlOrVnode
  );
}
