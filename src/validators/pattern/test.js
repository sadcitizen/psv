import { expect } from 'chai';
import pattern from '.';

describe('validators/pattern', () => {
    const digits = /^[0-9]+$/;
    let onlyDigits = pattern('The value must contain only digits')(digits);

    it('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(onlyDigits('12345')).to.deep.equal(result);
        expect(onlyDigits(12345)).to.deep.equal(result);
        expect(onlyDigits(0)).to.deep.equal(result);
    });

    it('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must contain only digits' };

        expect(onlyDigits('lorem')).to.deep.equal(result);
        expect(onlyDigits()).to.deep.equal(result);
        expect(onlyDigits(null)).to.deep.equal(result);
        expect(onlyDigits({})).to.deep.equal(result);
        expect(onlyDigits([])).to.deep.equal(result);
    });

    it('return invalid result with error message defined as function', () => {
        onlyDigits = pattern(value => `"${value}" must contain only digits`)(digits);

        expect(onlyDigits('lorem')).to.deep.equal({ isValid: false, error: '"lorem" must contain only digits' });
        expect(onlyDigits()).to.deep.equal({ isValid: false, error: '"undefined" must contain only digits' });
        expect(onlyDigits(null)).to.deep.equal({ isValid: false, error: '"null" must contain only digits' });
        expect(onlyDigits({})).to.deep.equal({ isValid: false, error: '"[object Object]" must contain only digits' });
        expect(onlyDigits([])).to.deep.equal({ isValid: false, error: '"" must contain only digits' });
        expect(onlyDigits(/\d+/ig)).to.deep.equal({ isValid: false, error: '"/\\d+/gi" must contain only digits' });
    });
});
