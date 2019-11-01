import { h, JSX } from 'preact';

import Button from '@stories/Button';

export default { title: 'Button' };

export const withText = (): JSX.Element => <Button>Text Button</Button>;
export const withEmoji = (): JSX.Element => <Button>😀 😎 👍 💯</Button>;
