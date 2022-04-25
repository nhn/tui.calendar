// reference: https://github.com/kkomelin/isomorphic-dompurify/issues/91#issuecomment-1012645198
import '@testing-library/jest-dom';

import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextDecoder = TextDecoder;

process.env.TZ = 'Asia/Seoul';
