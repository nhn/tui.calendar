import { h } from 'preact';

import Button from '@stories/Button';

export default { title: 'Other Button' };

export const withText = (): JSX.Element => <Button>Text Button</Button>;
export const withEmoji = (): JSX.Element => <Button>😀 😎 👍 💯</Button>;
