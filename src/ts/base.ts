import { render } from 'preact';
import renderToString from 'preact-render-to-string';

/**
 * @class Base abstract base class
 */
export default abstract class Base {
  private container: Element;

  private base?: Element;

  public constructor(container: Element) {
    this.container = container;
  }

  public render(): void {
    this.base = render(this.getComponent(), this.container, this.base);
  }

  public renderToString(): string {
    return renderToString.render(this.getComponent());
  }

  protected abstract getComponent(): JSX.Element;
}
