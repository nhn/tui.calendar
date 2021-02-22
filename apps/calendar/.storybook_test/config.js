import { configure } from '@storybook/preact';

import '../src/sass/index.scss';

// automatically import all files ending in *.stories.tsx?
configure(require.context('../stories', true, /\.stories\.tsx?$/), module);
