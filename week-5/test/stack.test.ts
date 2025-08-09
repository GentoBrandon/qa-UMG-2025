import { expect, test } from 'vitest';
import { balancedBrackets } from '../src/stack';

test('it should return true if the brackets in a string are balanced', () => {
    // Given a string with brackets
    const str = '([2+3]) + 2 * 3 {1,2}';

    // When we validate that the brackets are balanced
    const result = balancedBrackets(str);

    // Then the result should be true
    expect(result).toBe(true);
})

test('it should return false if the brackets in a string are not balanced', () => {
    // Given a string with brackets
    const str = '([2+3)]';

    // When we validate that the brackets are balanced
    const result = balancedBrackets(str);

    // Then the result should be false
    expect(result).toBe(false);
})

test('it should return false if a bracket is not closed', () => {
    // Given a string with a bracket that is not closed
    const str = '(2+3';

    // When we validate that the brackets are balanced
    const result = balancedBrackets(str);

    // Then the result should be false
    expect(result).toBe(false);
})