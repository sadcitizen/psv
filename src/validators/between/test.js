import { expect } from 'chai';
import between from '.';

describe('validators/between', () => {
    let betweenTenAndTwenty = between('The value must be between 10 and 20', 10, 20);

    it('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(betweenTenAndTwenty(15)).to.deep.equal(result);
        expect(betweenTenAndTwenty('lorem ipsum dolor'.length)).to.deep.equal(result);
    });

    it('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be between 10 and 20' };

        expect(betweenTenAndTwenty(9)).to.deep.equal(result);
        expect(betweenTenAndTwenty(21)).to.deep.equal(result);
        expect(betweenTenAndTwenty('lorem'.length)).to.deep.equal(result);
        expect(betweenTenAndTwenty('lorem ipsum dolor sit amet'.length)).to.deep.equal(result);
    });

    it('return invalid result with error message defined as function', () => {
        betweenTenAndTwenty = between(value => `"${value}" must be between 10 and 20`, 10, 20);

        expect(betweenTenAndTwenty(9)).to.deep.equal({ isValid: false, error: '"9" must be between 10 and 20' });
        expect(betweenTenAndTwenty(21)).to.deep.equal({ isValid: false, error: '"21" must be between 10 and 20' });
        expect(betweenTenAndTwenty('lorem'.length)).to.deep.equal({ isValid: false, error: '"5" must be between 10 and 20' });
        expect(betweenTenAndTwenty('lorem ipsum dolor sit amet'.length)).to.deep.equal({ isValid: false, error: '"26" must be between 10 and 20' });
    });
});
