import withPredicate from '.';
import pattern from '../validators/pattern';

describe('withPredicate', () => {
    const digits = /^[0-1]+$/;
    const message = 'The value must be binary number or empty string';
    const predicate = value => !!value.length;
    const isBinary = pattern(message, digits);
    const isBinaryOrEmptyString = withPredicate(isBinary, predicate);

    test('returns a function', () => {
        expect(typeof isBinaryOrEmptyString).toBe('function');
    });

    test('returns valid result', () => {
        expect(isBinaryOrEmptyString('0001')).toEqual({ isValid: true, error: '' });
        expect(isBinaryOrEmptyString('')).toEqual({ isValid: true, error: '' });
    });

    test('returns invalid result', () => {
        expect(isBinaryOrEmptyString('facade')).toEqual({ isValid: false, error: 'The value must be binary number or empty string' });
    });
});
