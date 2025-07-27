import { expect, test } from 'vitest'
import { stack } from '../src/stack.js'

test('it should return true if the string is valid', () => {
    const str = '([2+3]) + (2 * 3) + {1,2}';

    const result = stack(str);

    expect(result).toBe(true);

})

test('it should return false if the string is invalid', () => {
    const str = '([2+3)]';

    const result = stack(str);

    expect(result).toBe(false);

})

test('it should return false if the string is invalid', () => {
    const str = '([2+3)]';
    const str2 = '([2+3)]';


    const result = stack(str);

    expect(result).toBe(false);

})

