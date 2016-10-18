import { expect } from 'chai';
import sinon from 'sinon';
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

    it('do not call next if previous validator return invalid result', () => {
        const firstStub = sinon.stub().returns({ isValid: true, error: '' });
        const secondStub = sinon.stub().returns({ isValid: false, error: 'Stub error' });
        const thirdStub = sinon.stub().returns({ isValid: true, error: '' });

        const queue = createQueue(
            firstStub,
            secondStub,
            thirdStub
        );

        expect(queue('hi!')).to.deep.equal({ isValid: false, error: 'Stub error' });
        expect(firstStub.calledWith('hi!')).to.be.true;
        expect(secondStub.calledWith('hi!')).to.be.true;
        expect(thirdStub.called).to.be.false;
    });
});
