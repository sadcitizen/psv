import createValidator from '.';

describe('createValidator', () => {
    const isEven = createValidator(value => value % 2 === 0);

    test('returns a function', () => {
        expect(typeof isEven()).toBe('function');
    });

    test('returns valid result', () => {
        const result = isEven('The value must be an even number')(2);

        expect(result).toEqual({ isValid: true, error: '' });
    });

    test('works with error message as function', () => {
        const isOdd = createValidator(value => value % 2 !== 0);

        const result = isOdd(value => `${value} is not an odd number`)(2);

        expect(result).toEqual({ isValid: false, error: '2 is not an odd number' });
    });
});
