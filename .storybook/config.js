import { configure } from '@storybook/preact';

// automatically import all files ending in *.stories.tsx?
configure(require.context('../stories', true, /\.stories\.tsx?$/), module);
