import 'preact/debug';
import '@src/css/index.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import './storybook-styles.css';

import { Canvas } from '@storybook/addon-docs';
import { styled } from '@storybook/theming';

const StyledCanvas = styled(Canvas)({
  marginBottom: 0,
  '& + pre.sbdocs-pre > .docblock-source': {
    marginTop: 0,
  },
});

StyledCanvas.defaultProps = {
  withSource: 'none',
};

export const parameters = {
  docs: {
    components: {
      Canvas: StyledCanvas,
    },
  },
  layout: 'fullscreen',
};
