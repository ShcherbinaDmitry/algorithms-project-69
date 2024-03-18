// @ts-check

import { test, expect } from '@jest/globals';
import search from '../index.js';

test('search', () => {
  expect(search([], 'a')).toEqual([]);
  expect(search([{ id: 1, text: 'a' }], 'a')).toEqual([1]);
  expect(search([{ id: 1, text: 'a' }, { id: 2, text: 'b' }], 'a')).toEqual([1]);
  expect(search([{ id: 1, text: 'a' }, { id: 2, text: 'b' }], 'b')).toEqual([2]);
  expect(search([{ id: 1, text: 'a' }, { id: 2, text: 'b' }], 'c')).toEqual([]);
  expect(search([{ id: 1, text: 'a' }, { id: 2, text: 'ab' }], 'a')).toEqual([1]);
});

test('search with regex', () => {
  expect(search([{ id: 1, text: 'test' }, { id: 2, text: 'foo' }], 'test!')).toEqual([1]);
});

test('search with relevance', () => {
  const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
  const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
  const doc3 = { id: 'doc3', text: "I'm your shooter." };
  const doc4 = { id: 'doc4', text: "Please, don't shoot or I will shoot you!" };

  expect(search([doc1, doc2, doc3, doc4], 'shoot')).toEqual(['doc2', 'doc4', 'doc1']);
});
