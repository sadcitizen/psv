import { expect } from 'chai';
import createQueue from './create-queue';
import createValidator from './create-validator';
import required from './validators/required';

const isNumber = createValidator(value => typeof value === 'number');
const isEven = createValidator(value => value % 2 === 0);

describe('createQueue', () => {
    const queue = createQueue(
        required('The value must be defined')(),
        isNumber('The value must be a number')(),
        isEven('The value must be an even number')()
    );

    it('returns a function', () => {
        expect(queue).to.be.a('function');
    });

    it('returns a valid result', () => {
        const result = queue(2);

        expect(result).to.have.property('isValid')
            .that.is.a('boolean')
            .that.equal(true);

        expect(result).to.have.property('error')
            .that.is.a('string')
            .that.equal('');
    });

    it('return invalid result with error message', () => {
        const result = queue(3);

        expect(result).to.have.property('isValid')
            .that.is.a('boolean')
            .that.equal(false);

        expect(result).to.have.property('error')
            .that.is.a('string')
            .that.equal('The value must be an even number');
    });
});
