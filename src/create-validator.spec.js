import { expect } from 'chai';
import createValidator from './create-validator';

describe('createValidator', () => {
    const isEven = createValidator(
        'The value is not an even number',
        value => value % 2 === 0
    );

    it('returns a function', () => {
        expect(isEven).to.be.a('function');
    });

    it('returns a valid validation result', () => {
        const result = isEven(2);

        expect(result).to.have.property('isValid').that.is.a('boolean');
        expect(result).to.have.property('error').that.is.a('string');
    });

    it('works with error message as function', () => {
        const isOdd = createValidator(
            value => `${value} is not an odd number`,
            value => value % 2 !== 0
        );

        const result = isOdd(2);

        expect(result).to.have.property('isValid').that.is.a('boolean');
        expect(result).to.have.property('error').that.is.a('string');
    });
});
