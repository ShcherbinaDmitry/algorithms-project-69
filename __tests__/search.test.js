// @ts-check

import { test, expect } from '@jest/globals';
import search from '../index.js';

test('search', () => {
  expect(search([], 'a')).toEqual([]);
  expect(search([{ id: 1, text: 'a' }], 'a')).toEqual([1]);
  expect(search([{ id: 1, text: 'a' }, { id: 2, text: 'b' }], 'a')).toEqual([1]);
  expect(search([{ id: 1, text: 'a' }, { id: 2, text: 'b' }], 'b')).toEqual([2]);
  expect(search([{ id: 1, text: 'a' }, { id: 2, text: 'b' }], 'c')).toEqual([]);
  expect(search([{ id: 1, text: 'a' }, { id: 2, text: 'ab' }], 'a')).toEqual([1, 2]);
});
