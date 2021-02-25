declare module 'preact-markup' {
  import {
    createElement,
    Component,
    VNode,
    ComponentConstructor,
    FunctionalComponent,
  } from 'preact';

  type Components = Record<string, ComponentConstructor<any, any> | FunctionalComponent<any>>;

  type ErrorParam = {
    error: Error;
  };

  type Props = {
    type?: string;
    trim?: boolean;
    wrap?: boolean;
    reviver?: typeof createElement;
    markup: string;
    components?: Components;
    onError?: (error: ErrorParam) => void;
    'allow-scripts'?: boolean;
    'allow-events'?: boolean;
    [key: string]: any;
  };

  class Markup extends Component<Props, {}> {
    static setReviver(h: typeof createElement): void;

    public setComponents(components: Components): void;

    public render(props: Props): VNode;
  }

  export default Markup;
}
