import { expect } from '@playwright/test';

import TZDate from '@src/time/date';
import { mergeObject } from '@src/utils/object';

describe('mergeObject', () => {
  it('should merge two objects', () => {
    const target = {
      a: 1,
      b: 2,
      c: 3,
    };
    const source = {
      a: 2,
      b: 3,
      d: 4,
    };

    const result = mergeObject(target, source);

    expect(result).toEqual({
      a: 2,
      b: 3,
      c: 3,
      d: 4,
    });
  });

  it('should merge two nested object', () => {
    const target = {
      a: 1,
      b: {
        b1: 1,
        b2: 2,
        b3: {
          b31: 31,
          b32: 32,
        },
      },
    };
    const source = {
      b: {
        b3: {
          b32: 35,
        },
      },
    };

    const result = mergeObject(target, source);

    expect(result).toEqual({
      a: 1,
      b: {
        b1: 1,
        b2: 2,
        b3: {
          b31: 31,
          b32: 35,
        },
      },
    });
  });

  it('should accept null in nested object', () => {
    type Expected = {
      a: number;
      b: number;
      c: {
        // Allow null only if proper type is defined
        c1: string | null;
        c2: string | null;
      };
    };

    const target: Expected = {
      a: 1,
      b: 2,
      c: {
        c1: 'c1',
        c2: 'c2',
      },
    };
    const source = {
      c: {
        c2: null,
      },
    };

    const result = mergeObject(target, source);

    expect(result).toEqual({
      a: 1,
      b: 2,
      c: {
        c1: 'c1',
        c2: null,
      },
    });
  });

  it('should replace arrays in nested object', () => {
    const target = {
      a: [0, 1],
      b: {
        c: ['2', '3'],
      },
    };
    const source = {
      b: { c: ['4', '5'] },
    };

    const result = mergeObject(target, source);

    expect(result).toEqual({
      a: [0, 1],
      b: {
        c: ['4', '5'],
      },
    });
  });

  it('should replace TZDate instance in nested object', () => {
    const target = {
      a: 1,
      b: '2',
      c: ['3', '4'],
      d: new TZDate(2021, 11, 15),
    };
    const source = {
      d: new TZDate(2021, 11, 16),
    };

    const result = mergeObject(target, source);

    expect(result).toEqual({
      a: 1,
      b: '2',
      c: ['3', '4'],
      d: new TZDate(2021, 11, 16),
    });
  });
});
