import { cls } from '@src/helpers/css';
import type EventUIModel from '@src/model/eventUIModel';
import { templates } from '@src/template/default';
import type TZDate from '@src/time/date';
import { toFormat } from '@src/time/datetime';
import { isNumber } from '@src/utils/type';

import type { GridUIModel } from '@t/grid';
import type { Template, TemplateConfig } from '@t/template';

export function registerTemplateConfig(templateConfig: TemplateConfig = {}): Template {
  return {
    ...templates,
    ...templateConfig,
  };
}

/**
 * Get CSS syntax for element size
 * @param {number} value - size value to apply element
 * @param {string} postfix - postfix string ex) px, em, %
 * @param {string} prefix - property name ex) width, height
 * @returns {string} CSS syntax
 */
function getElSize(value: number | string, postfix: string, prefix: string) {
  prefix = prefix || '';
  if (isNumber(value)) {
    return `${prefix}:${value}${postfix}`;
  }

  return `${prefix}: auto`;
}

/**
 * Get element left based on narrowWeekend
 * @param {EventUIModel} uiModel - ui model
 * @param {Array} grids - dates information
 * @returns {number} element left
 */
function getElLeft(uiModel: EventUIModel, grids: GridUIModel[]) {
  return grids[uiModel.left] ? grids[uiModel.left].left : 0;
}

/**
 * Get element width based on narrowWeekend
 * @param {EventUIModel} uiModel - ui model
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
function getElWidth(uiModel: EventUIModel, grids: GridUIModel[]) {
  let width = 0;
  const { length } = grids;

  for (let i = 0; i < uiModel.width; i += 1) {
    let left = (uiModel.left + i) % length;
    left += (uiModel.left + i) / length;
    if (left < length) {
      width += grids[left] ? grids[left].width : 0;
    }
  }

  return width;
}

/**
 * Get hhmm formatted time str
 * @param {TZDate} date - date object
 * @returns {string} formatted value
 */
export function getHhmm(date: TZDate) {
  return toFormat(date, 'HH:mm');
}

/**
 * Get `width` stylesheet string
 * @param {number} width - width percentage
 * @returns {string} css style part
 */
export function getCommonWidth(width: number | string) {
  return getElSize(width, '%', 'width');
}

/**
 * Get element left based on narrowWeekend
 * @param {EventUIModel} uiModel - ui model
 * @param {Array} grids - dates information
 * @returns {number} element left
 */
export function getGridLeft(uiModel: EventUIModel, grids: GridUIModel[]) {
  return getElLeft(uiModel, grids);
}

/**
 * Get element width based on narrowWeekend
 * @param {EventUIModel} uiModel - ui model
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
export function getGridWidth(uiModel: EventUIModel, grids: GridUIModel[]) {
  return getElWidth(uiModel, grids);
}

/**
 * Use in time.hbs
 * @param {EventUIModel} uiModel ui model
 * @returns {string} element size css class
 */
export function getTimeEventBlock(uiModel: EventUIModel) {
  const top = getElSize(uiModel.top, 'px', 'top');
  const left = getElSize(uiModel.left, '%', 'left');
  const width = getElSize(uiModel.width, '%', 'width');
  const height = getElSize(uiModel.height, 'px', 'height');

  return [top, left, width, height].join(';');
}

export function getMonthEventBlock(
  uiModel: EventUIModel,
  grids: GridUIModel[],
  blockHeight: number,
  paddingTop: number
) {
  const top = getElSize((uiModel.top - 1) * blockHeight + paddingTop, 'px', 'top');
  const left = getElSize(grids[uiModel.left] ? grids[uiModel.left].left : 0, '%', 'left');
  const width = getElSize(getElWidth(uiModel, grids), '%', 'width');
  const height = getElSize(uiModel.height, 'px', 'height');

  return [top, left, width, height].join(';');
}

export function getHolidayClass(day: number) {
  if (day === 0) {
    return cls('holiday-sun');
  }

  if (day === 6) {
    return cls('holiday-sat');
  }

  return '';
}

export function getRight(a: number, b: number) {
  return Math.max(0, 100 - (a + b));
}
