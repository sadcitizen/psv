import { expect } from 'chai';
import lessThan from '.';

describe('validators/lessThan', () => {
    let lessThanFive = lessThan('The value must be less than 5', 5);
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const lorem = 'lorem ipsum';

    it('return valid result', () => {
        const result = { isValid: true, error: '' };

        expect(lessThanFive(4)).to.deep.equal(result);
        expect(lessThanFive([0, 1].length)).to.deep.equal(result);
        expect(lessThanFive('hi'.length)).to.deep.equal(result);
    });

    it('return invalid result with error message', () => {
        const result = { isValid: false, error: 'The value must be less than 5' };

        expect(lessThanFive(14)).to.deep.equal(result);
        expect(lessThanFive(digits.length)).to.deep.equal(result);
        expect(lessThanFive(lorem.length)).to.deep.equal(result);
    });

    it('return invalid result with error message defined as function', () => {
        lessThanFive = lessThan(value => `"${value}" is greater than 5`, 5);

        expect(lessThanFive(14)).to.deep.equal({ isValid: false, error: '"14" is greater than 5' });
        expect(lessThanFive(digits.length)).to.deep.equal({ isValid: false, error: '"10" is greater than 5' });
        expect(lessThanFive(lorem.length)).to.deep.equal({ isValid: false, error: '"11" is greater than 5' });
    });
});
