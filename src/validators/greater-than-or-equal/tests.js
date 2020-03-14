import greaterThanOrEqual from '.';

describe('validators/greaterThanOrEqual', () => {
    let greaterThanOrEqualFive = greaterThanOrEqual('The value must be greater than or equal 5', 5);
    const bits = [0, 1];
    const hi = 'hi';

    test('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(greaterThanOrEqualFive(5)).toEqual(result);
        expect(greaterThanOrEqualFive(6)).toEqual(result);
        expect(greaterThanOrEqualFive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].length)).toEqual(result);
        expect(greaterThanOrEqualFive('lorem ipsum'.length)).toEqual(result);
    });

    test('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be greater than or equal 5' };

        expect(greaterThanOrEqualFive(4)).toEqual(result);
        expect(greaterThanOrEqualFive(bits.length)).toEqual(result);
        expect(greaterThanOrEqualFive(hi.length)).toEqual(result);
    });

    test('return invalid result with error message defined as function', () => {
        greaterThanOrEqualFive = greaterThanOrEqual(value => `"${value}" is less than 5`, 5);

        expect(greaterThanOrEqualFive(4)).toEqual({ isValid: false, error: '"4" is less than 5' });
        expect(greaterThanOrEqualFive(bits.length)).toEqual({ isValid: false, error: '"2" is less than 5' });
        expect(greaterThanOrEqualFive(hi.length)).toEqual({ isValid: false, error: '"2" is less than 5' });
    });
});
