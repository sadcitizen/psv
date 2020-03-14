import withProperty from '.';
import greaterThan from '../validators/greater-than';

describe('withProperty', () => {
    const message = (value, minValue) => `The value must be greater than ${minValue}`;
    const greaterThanSix = greaterThan(message, 6);
    const lengthGreaterThanSix = withProperty(greaterThanSix, 'length');

    test('returns a function', () => {
        expect(typeof lengthGreaterThanSix).toBe('function');
    });

    test('returns valid result', () => {
        const result = lengthGreaterThanSix('lorem ipsum');

        expect(result).toEqual({ isValid: true, error: '' });
    });

    test('returns invalid result', () => {
        const result = lengthGreaterThanSix('lorem');

        expect(result).toEqual({ isValid: false, error: 'The value must be greater than 6' });
    });
});
