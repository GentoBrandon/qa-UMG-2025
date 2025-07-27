import { expect, test } from 'vitest'
import { sum } from '../src/index.js'

test('adds 1 + 2 to equal 3', () => {
  //Give two numbers
  const a = 1;
  const b = 2;
  //Sum the two numbers
  const result = sum(a, b);
  //Expect the result to be 3
  expect(result).toBe(3);
})