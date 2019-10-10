import { h, Component, AnyComponent } from 'preact';
import { AppContext } from '@src/model';

export abstract class ContextComponent<P = {}, S = {}> extends Component<P, S> {
  context!: AppContext;
}

export function contextPass(WrappedComponent: AnyComponent, context: AppContext): AnyComponent {
  return class HOC extends Component {
    getChildContext() {
      return context;
    }

    render() {
      return <WrappedComponent />;
    }
  };
}
