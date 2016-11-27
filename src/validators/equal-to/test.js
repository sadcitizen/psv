import { expect } from 'chai';
import equalTo from '.';

describe('validators/equalTo', () => {
    let equalToFive = equalTo('The value must be equal to 5')(5);

    it('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(equalToFive(5)).to.deep.equal(result);
        expect(equalToFive([0, 1, 2, 3, 4].length)).to.deep.equal(result);
        expect(equalToFive('lorem'.length)).to.deep.equal(result);
    });

    it('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be equal to 5' };

        expect(equalToFive(6)).to.deep.equal(result);
        expect(equalToFive([0, 1, 2, 3, 4, 5].length)).to.deep.equal(result);
        expect(equalToFive('lorem ipsum'.length)).to.deep.equal(result);
    });

    it('return invalid result with error message defined as function', () => {
        equalToFive = equalTo(value => `"${value}" is not equal to 5`)(5);

        expect(equalToFive(4)).to.deep.equal({ isValid: false, error: '"4" is not equal to 5' });
        expect(equalToFive([0, 1, 2].length)).to.deep.equal({ isValid: false, error: '"3" is not equal to 5' });
        expect(equalToFive('lorem ipsum'.length)).to.deep.equal({ isValid: false, error: '"11" is not equal to 5' });
    });
});
