import { templates } from '@src/template/default';
import forEach from 'tui-code-snippet/collection/forEach';
import { Template, TemplateConfig, GridViewModel } from '@src/model';
import { cls } from '@src/util/cssHelper';
import isNumber from 'tui-code-snippet/type/isNumber';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { format } from '@src/time/datetime';
import TZDate from '@src/time/date';

export function registerTemplateConfig(templateConfig: TemplateConfig = {}): Template {
  const newTemplates: Template = { ...templates };
  forEach(templateConfig, (func: Function, name: string) => {
    newTemplates[name] = func || newTemplates[name];
  });

  return newTemplates;
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
 * @param {ScheduleViewModel} viewModel - view model
 * @param {Array} grids - dates information
 * @returns {number} element left
 */
function getElLeft(viewModel: ScheduleViewModel, grids: GridViewModel[]) {
  return grids[viewModel.left] ? grids[viewModel.left].left : 0;
}

/**
 * Get element width based on narrowWeekend
 * @param {ScheduleViewModel} viewModel - view model
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
function getElWidth(viewModel: ScheduleViewModel, grids: GridViewModel[]) {
  let width = 0;
  const { length } = grids;

  for (let i = 0; i < viewModel.width; i += 1) {
    let left = (viewModel.left + i) % length;
    left += (viewModel.left + i) / length;
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
  return format(date, 'HH:mm');
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
 * @param {ScheduleViewModel} viewModel - view model
 * @param {Array} grids - dates information
 * @returns {number} element left
 */
export function getGridLeft(viewModel: ScheduleViewModel, grids: GridViewModel[]) {
  return getElLeft(viewModel, grids);
}

/**
 * Get element width based on narrowWeekend
 * @param {ScheduleViewModel} viewModel - view model
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
export function getGridWidth(viewModel: ScheduleViewModel, grids: GridViewModel[]) {
  return getElWidth(viewModel, grids);
}

/**
 * Use in time.hbs
 * @param {ScheduleViewModel} viewModel viewModel
 * @returns {string} element size css class
 */
export function getTimeScheduleBlock(viewModel: ScheduleViewModel) {
  const top = getElSize(viewModel.top, 'px', 'top');
  const left = getElSize(viewModel.left, '%', 'left');
  const width = getElSize(viewModel.width, '%', 'width');
  const height = getElSize(viewModel.height, 'px', 'height');

  return [top, left, width, height].join(';');
}

export function getMonthScheduleBlock(
  viewModel: ScheduleViewModel,
  grids: GridViewModel[],
  blockHeight: number,
  paddingTop: number
) {
  const top = getElSize((viewModel.top - 1) * blockHeight + paddingTop, 'px', 'top');
  const left = getElSize(grids[viewModel.left] ? grids[viewModel.left].left : 0, '%', 'left');
  const width = getElSize(getElWidth(viewModel, grids), '%', 'width');
  const height = getElSize(viewModel.height, 'px', 'height');

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
