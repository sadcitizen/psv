import lessThan from '.';

describe('validators/lessThanOrEqual', () => {
    let lessThanFive = lessThan('The value must be less than or equal 5', 5);
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const lorem = 'lorem ipsum';

    test('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(lessThanFive(4)).toEqual(result);
        expect(lessThanFive(5)).toEqual(result);
        expect(lessThanFive([0, 1].length)).toEqual(result);
        expect(lessThanFive('hi'.length)).toEqual(result);
    });

    test('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be less than or equal 5' };

        expect(lessThanFive(14)).toEqual(result);
        expect(lessThanFive(digits.length)).toEqual(result);
        expect(lessThanFive(lorem.length)).toEqual(result);
    });

    test('return invalid result with error message defined as function', () => {
        lessThanFive = lessThan(value => `"${value}" is greater than 5`, 5);

        expect(lessThanFive(14)).toEqual({ isValid: false, error: '"14" is greater than 5' });
        expect(lessThanFive(digits.length)).toEqual({ isValid: false, error: '"10" is greater than 5' });
        expect(lessThanFive(lorem.length)).toEqual({ isValid: false, error: '"11" is greater than 5' });
    });
});
