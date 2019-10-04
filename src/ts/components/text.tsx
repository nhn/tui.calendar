import { h } from 'preact';
import { ContextComponent } from '@src/components/hoc';

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
      count: 0
    };
  }

  private onClick() {
    const { event: events, outerEvent: outerEvents } = this.context;

    events.fire('dblclick', 'data');
    events.fire('render');
    outerEvents.fire('beforeCreateSchedule', 'data');

    this.setState({
      count: this.state.count + 1
    });
  }

  render(props: Props, state: State) {
    const { theme } = this.context;
    const { count } = state;

    return (
      <span style={{ color: theme.getStyle('common.holiday.color') }} onClick={this.onClick}>
        {props.children}
        :&nbsp;{count}
      </span>
    );
  }
}
