import lessThanOrEqual from '.';

describe('validators/lessThanOrEqual', () => {
    let lessThanOrEqualFive = lessThanOrEqual('The value must be less than or equal 5', 5);
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const lorem = 'lorem ipsum';

    test('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(lessThanOrEqualFive(4)).toEqual(result);
        expect(lessThanOrEqualFive(5)).toEqual(result);
        expect(lessThanOrEqualFive([0, 1].length)).toEqual(result);
        expect(lessThanOrEqualFive('hi'.length)).toEqual(result);
    });

    test('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be less than or equal 5' };

        expect(lessThanOrEqualFive(14)).toEqual(result);
        expect(lessThanOrEqualFive(digits.length)).toEqual(result);
        expect(lessThanOrEqualFive(lorem.length)).toEqual(result);
    });

    test('return invalid result with error message defined as function', () => {
        lessThanOrEqualFive = lessThanOrEqual(value => `"${value}" is greater than 5`, 5);

        expect(lessThanOrEqualFive(14)).toEqual({ isValid: false, error: '"14" is greater than 5' });
        expect(lessThanOrEqualFive(digits.length)).toEqual({ isValid: false, error: '"10" is greater than 5' });
        expect(lessThanOrEqualFive(lorem.length)).toEqual({ isValid: false, error: '"11" is greater than 5' });
    });
});
