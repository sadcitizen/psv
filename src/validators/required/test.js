import { expect } from 'chai';
import required from '.';

describe('validators/required', () => {
    let requiredField = required('The value must be defined');

    it('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(requiredField(true)).to.deep.equal(result);
        expect(requiredField(false)).to.deep.equal(result);
        expect(requiredField('lorem')).to.deep.equal(result);
        expect(requiredField(42)).to.deep.equal(result);
        expect(requiredField(0)).to.deep.equal(result);
    });

    it('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be defined' };

        expect(requiredField('')).to.deep.equal(result);
        expect(requiredField('    ')).to.deep.equal(result);
        expect(requiredField(null)).to.deep.equal(result);
        expect(requiredField(undefined)).to.deep.equal(result);
    });

    it('return invalid result with error message defined as function', () => {
        requiredField = required(value => `"${value}" is empty value`);

        expect(requiredField('')).to.deep.equal({ isValid: false, error: '"" is empty value' });
        expect(requiredField('    ')).to.deep.equal({ isValid: false, error: '"    " is empty value' });
        expect(requiredField(null)).to.deep.equal({ isValid: false, error: '"null" is empty value' });
        expect(requiredField(undefined)).to.deep.equal({ isValid: false, error: '"undefined" is empty value' });
    });
});
