import equalTo from '.';

describe('validators/equalTo', () => {
    let equalToFive = equalTo('The value must be equal to 5', 5);

    test('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(equalToFive(5)).toEqual(result);
        expect(equalToFive([0, 1, 2, 3, 4].length)).toEqual(result);
        expect(equalToFive('lorem'.length)).toEqual(result);
    });

    test('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be equal to 5' };

        expect(equalToFive(6)).toEqual(result);
        expect(equalToFive([0, 1, 2, 3, 4, 5].length)).toEqual(result);
        expect(equalToFive('lorem ipsum'.length)).toEqual(result);
    });

    test('return invalid result with error message defined as function', () => {
        equalToFive = equalTo(value => `"${value}" is not equal to 5`, 5);

        expect(equalToFive(4)).toEqual({ isValid: false, error: '"4" is not equal to 5' });
        expect(equalToFive([0, 1, 2].length)).toEqual({ isValid: false, error: '"3" is not equal to 5' });
        expect(equalToFive('lorem ipsum'.length)).toEqual({ isValid: false, error: '"11" is not equal to 5' });
    });
});
