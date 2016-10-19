import { expect } from 'chai';
import withProperty from './with-property';
import greaterThan from './validators/greater-than';

describe('withProperty', () => {
    const message = (value, minValue) => `The value must be greater than ${minValue}`;
    const lengthGreaterThanSix = withProperty(greaterThan(message)(6), 'length');

    it('returns a function', () => {
        expect(lengthGreaterThanSix).to.be.a('function');
    });

    it('returns valid result', () => {
        const result = lengthGreaterThanSix('lorem ipsum');

        expect(result).to.have.property('isValid')
            .that.is.a('boolean')
            .that.equal(true);

        expect(result).to.have.property('error')
            .that.is.a('string')
            .that.equal('');
    });

    it('returns invalid result', () => {
        const result = lengthGreaterThanSix('lorem');

        expect(result).to.have.property('isValid')
            .that.is.a('boolean')
            .that.equal(false);

        expect(result).to.have.property('error')
            .that.is.a('string')
            .that.equal('The value must be greater than 6');
    });
});
