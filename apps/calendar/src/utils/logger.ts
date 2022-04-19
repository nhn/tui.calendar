import { MESSAGE_PREFIX } from '@src/constants/message';

/* eslint-disable no-console */
export const logger = {
  error: (firstArg: any, ...restArgs: any[]) => {
    console.error(`${MESSAGE_PREFIX}${firstArg}`, ...restArgs);
  },
  warn: (firstArg: any, ...restArgs: any[]) => {
    console.warn(`${MESSAGE_PREFIX}${firstArg}`, ...restArgs);
  },
};
