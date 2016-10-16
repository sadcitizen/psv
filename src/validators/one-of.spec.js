import { expect } from 'chai';
import oneOf from './one-of';

describe('validators/oneOf', () => {
    const colors = ['#cc0000', '#00cc00', '#0000cc'];
    let oneOfColors = oneOf('The color must be one of "colors"')(colors);

    it('return valid result', () => {
        colors.forEach(color => {
            expect(oneOfColors(color)).to.deep.equal({ isValid: true, error: '' });
        });
    });

    it('return invalid result with error message', () => {
        expect(oneOfColors('#ccf000')).to.deep.equal({ isValid: false, error: 'The color must be one of "colors"' });
    });

    it('return invalid result with error message defined as function', () => {
        oneOfColors = oneOf(color => `${color} is not one of "colors"`)(colors);

        expect(oneOfColors('#ccf000')).to.deep.equal({ isValid: false, error: '#ccf000 is not one of "colors"' });
    });
});
