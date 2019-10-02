import { render } from 'preact';
import renderToString from 'preact-render-to-string';

/**
 * @class Base abstract base class
 */
export default abstract class Base {
  private container: Element;

  private base?: Element;

  constructor(container: Element) {
    this.container = container;
  }

  render(): void {
    this.base = render(this.getComponent(), this.container, this.base);
  }

  renderToString(): string {
    return renderToString.render(this.getComponent());
  }

  protected abstract getComponent(): JSX.Element;
}
