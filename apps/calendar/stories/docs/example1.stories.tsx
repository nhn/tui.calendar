import { h } from 'preact';

import type { Story } from '@storybook/preact';

import { generateCalendarExample } from '@stories/util/generateCalendarExample';

const Example = generateCalendarExample({ defaultView: 'month' });

export const Template: Story = (args) => <Example {...args} />;

export const Example1 = Template.bind({});
