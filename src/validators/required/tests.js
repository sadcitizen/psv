import required from '.';

describe('validators/required', () => {
    let requiredField = required('The value must be defined');

    test('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(requiredField(true)).toEqual(result);
        expect(requiredField(false)).toEqual(result);
        expect(requiredField('lorem')).toEqual(result);
        expect(requiredField(42)).toEqual(result);
        expect(requiredField(0)).toEqual(result);
    });

    test('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be defined' };

        expect(requiredField('')).toEqual(result);
        expect(requiredField('    ')).toEqual(result);
        expect(requiredField(null)).toEqual(result);
        expect(requiredField(undefined)).toEqual(result);
    });

    test('return invalid result with error message defined as function', () => {
        requiredField = required(value => `"${value}" is empty value`);

        expect(requiredField('')).toEqual({ isValid: false, error: '"" is empty value' });
        expect(requiredField('    ')).toEqual({ isValid: false, error: '"    " is empty value' });
        expect(requiredField(null)).toEqual({ isValid: false, error: '"null" is empty value' });
        expect(requiredField(undefined)).toEqual({ isValid: false, error: '"undefined" is empty value' });
    });
});
