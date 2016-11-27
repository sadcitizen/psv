import { expect } from 'chai';
import greaterThan from '.';

describe('validators/greaterThan', () => {
    let greaterThanFive = greaterThan('The value must be greater than 5')(5);
    const bits = [0, 1];
    const hi = 'hi';

    it('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(greaterThanFive(6)).to.deep.equal(result);
        expect(greaterThanFive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].length)).to.deep.equal(result);
        expect(greaterThanFive('lorem ipsum'.length)).to.deep.equal(result);
    });

    it('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be greater than 5' };

        expect(greaterThanFive(4)).to.deep.equal(result);
        expect(greaterThanFive(bits.length)).to.deep.equal(result);
        expect(greaterThanFive(hi.length)).to.deep.equal(result);
    });

    it('return invalid result with error message defined as function', () => {
        greaterThanFive = greaterThan(value => `"${value}" is less than 5`)(5);

        expect(greaterThanFive(4)).to.deep.equal({ isValid: false, error: '"4" is less than 5' });
        expect(greaterThanFive(bits.length)).to.deep.equal({ isValid: false, error: '"2" is less than 5' });
        expect(greaterThanFive(hi.length)).to.deep.equal({ isValid: false, error: '"2" is less than 5' });
    });
});
