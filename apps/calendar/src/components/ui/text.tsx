import { h, JSX } from 'preact';

import ContextComponent from '@src/components/contextComponent';
import { AppContext } from '@src/model';

export interface Props {
  children?: string | string[] | JSX.Element[];
}
export interface State {
  count: number;
}

export class Text extends ContextComponent<Props, State> {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);

    this.state = {
      count: 0,
    };
  }

  private onClick() {
    const { internalEvent: events, externalEvent: outerEvents } = this.context;

    events.fire('dblclick', 'data');
    events.fire('render');
    outerEvents.fire('beforeCreateSchedule', 'data');

    this.setState({
      count: this.state.count + 1,
    });
  }

  render(props: Props, state: State, context: AppContext) {
    // const { theme } = context;
    const { count } = state;

    return (
      // @TODO: use theme value for font color - theme.common.holiday.color
      <span style={{ color: '#fff' }} onClick={this.onClick}>
        {props.children}
        :&nbsp;{count}
      </span>
    );
  }
}
