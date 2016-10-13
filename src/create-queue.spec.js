import { expect } from 'chai';
import createQueue from './create-queue';
import createValidator from './create-validator';

const isRequired = createValidator(
    'The value is required',
    value => value !== undefined && value !== null
);

const isNumber = createValidator(
    'The value should be a number',
    value => typeof value === 'number'
);

const isEven = createValidator(
    'The value is not an even number',
    value => value % 2 === 0
);

describe('createQueue', () => {
    const queue = createQueue(isRequired, isNumber, isEven);

    it('returns a function', () => {
        expect(queue).to.be.a('function');
    });

    it('returns a valid validation result', () => {
        const result = queue(2);

        expect(result).to.have.property('isValid').that.is.a('boolean');
        expect(result).to.have.property('error').that.is.a('string');
    });
});
