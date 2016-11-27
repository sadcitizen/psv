import { expect } from 'chai';
import withPredicate from '.';
import pattern from '../validators/pattern';

describe('withPredicate', () => {
    const digits = /^[0-1]+$/;
    const message = 'The value must be binary number or empty string';
    const predicate = value => !!value.length;
    const isBinaryOrEmptyString = withPredicate(pattern(message)(digits), predicate);

    it('returns a function', () => {
        expect(isBinaryOrEmptyString).to.be.a('function');
    });

    it('returns valid result', () => {
        expect(isBinaryOrEmptyString('0001')).to.be.deep.equal({ isValid: true, error: '' });
        expect(isBinaryOrEmptyString('')).to.be.deep.equal({ isValid: true, error: '' });
    });

    it('returns invalid result', () => {
        expect(isBinaryOrEmptyString('facade')).to.be.deep.equal({ isValid: false, error: 'The value must be binary number or empty string' });
    });
});
