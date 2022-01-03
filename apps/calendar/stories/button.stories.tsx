import { h } from 'preact';

import { Button } from '@src/components/ui/button';

export default { title: 'Components/Button', component: Button };

export const withText = () => <Button className="button">Text Button</Button>;
export const withEmoji = () => <Button className="button">😀 😎 👍 💯</Button>;
