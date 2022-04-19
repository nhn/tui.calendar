import {
  INVALID_DATETIME_FORMAT,
  INVALID_TIMEZONE_NAME,
  INVALID_VIEW_TYPE,
} from '@src/constants/error';
import { MESSAGE_PREFIX } from '@src/constants/message';

/**
 * Define custom errors for calendar
 * These errors are exposed to the user.
 *
 * We can throw the default `Error` instance for internal errors.
 */

export class InvalidTimezoneNameError extends Error {
  constructor(timezoneName: string) {
    super(`${MESSAGE_PREFIX}${INVALID_TIMEZONE_NAME} - ${timezoneName}`);
    this.name = 'InvalidTimezoneNameError';
  }
}

export class InvalidDateTimeFormatError extends Error {
  constructor(dateTimeString: string) {
    super(`${MESSAGE_PREFIX}${INVALID_DATETIME_FORMAT} - ${dateTimeString}`);
    this.name = 'InvalidDateTimeFormatError';
  }
}

export class InvalidViewTypeError extends Error {
  constructor(viewType: string) {
    super(`${MESSAGE_PREFIX}${INVALID_VIEW_TYPE} - ${viewType}`);
    this.name = 'InvalidViewTypeError';
  }
}
