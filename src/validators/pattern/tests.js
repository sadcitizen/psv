import pattern from '.';

describe('validators/pattern', () => {
    const digits = /^[0-9]+$/;
    let onlyDigits = pattern('The value must contain only digits', digits);

    test('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(onlyDigits('12345')).toEqual(result);
        expect(onlyDigits(12345)).toEqual(result);
        expect(onlyDigits(0)).toEqual(result);
    });

    test('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must contain only digits' };

        expect(onlyDigits('lorem')).toEqual(result);
        expect(onlyDigits()).toEqual(result);
        expect(onlyDigits(null)).toEqual(result);
        expect(onlyDigits({})).toEqual(result);
        expect(onlyDigits([])).toEqual(result);
    });

    test('return invalid result with error message defined as function', () => {
        onlyDigits = pattern(value => `"${value}" must contain only digits`, digits);

        expect(onlyDigits('lorem')).toEqual({ isValid: false, error: '"lorem" must contain only digits' });
        expect(onlyDigits()).toEqual({ isValid: false, error: '"undefined" must contain only digits' });
        expect(onlyDigits(null)).toEqual({ isValid: false, error: '"null" must contain only digits' });
        expect(onlyDigits({})).toEqual({ isValid: false, error: '"[object Object]" must contain only digits' });
        expect(onlyDigits([])).toEqual({ isValid: false, error: '"" must contain only digits' });
        expect(onlyDigits(/\d+/ig)).toEqual({ isValid: false, error: '"/\\d+/gi" must contain only digits' });
    });
});
