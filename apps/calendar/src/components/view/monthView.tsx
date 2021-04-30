import { h } from 'preact';
import { Text } from '@src/components/ui/text';
import { Template } from '@src/components/template';
import ContextComponent from '@src/components/contextComponent';

export default class Month extends ContextComponent {
  componentDidMount() {
    const { internalEvent: events } = this.context;

    events.on('click', this.onYogaFire, this);
  }

  private onYogaFire(data: string) {
    const { externalEvent: outerEvents } = this.context;

    outerEvents.fire('clickSchedule', data);
  }

  render() {
    return (
      <div style={{ height: 300 }}>
        <Text>Do 텍스트 클릭</Text>
        <Template template="time" model={{ title: '타이틀 템플릿 렌더링4' }} />
        <p>
          <Template template="time" model={{ title: '템플릿 렌더링한다. p 태그로.' }} />
        </p>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
          diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div>
    );
  }
}
