import between from '.';

describe('validators/between', () => {
    let betweenTenAndTwenty = between('The value must be between 10 and 20', 10, 20);

    test('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(betweenTenAndTwenty(15)).toEqual(result);
        expect(betweenTenAndTwenty('lorem ipsum dolor'.length)).toEqual(result);
    });

    test('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be between 10 and 20' };

        expect(betweenTenAndTwenty(9)).toEqual(result);
        expect(betweenTenAndTwenty(21)).toEqual(result);
        expect(betweenTenAndTwenty('lorem'.length)).toEqual(result);
        expect(betweenTenAndTwenty('lorem ipsum dolor sit amet'.length)).toEqual(result);
    });

    test('return invalid result with error message defined as function', () => {
        betweenTenAndTwenty = between(value => `"${value}" must be between 10 and 20`, 10, 20);

        expect(betweenTenAndTwenty(9)).toEqual({ isValid: false, error: '"9" must be between 10 and 20' });
        expect(betweenTenAndTwenty(21)).toEqual({ isValid: false, error: '"21" must be between 10 and 20' });
        expect(betweenTenAndTwenty('lorem'.length)).toEqual({ isValid: false, error: '"5" must be between 10 and 20' });
        expect(betweenTenAndTwenty('lorem ipsum dolor sit amet'.length)).toEqual({ isValid: false, error: '"26" must be between 10 and 20' });
    });
});
