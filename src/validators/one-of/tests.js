import oneOf from '.';

describe('validators/oneOf', () => {
    const colors = ['#cc0000', '#00cc00', '#0000cc'];
    let oneOfColors = oneOf('The color must be one of "colors"', colors);

    test('return valid result', () => {
        colors.forEach(color => {
            expect(oneOfColors(color)).toEqual({ isValid: true, error: '' });
        });
    });

    test('return invalid result with error message', () => {
        expect(oneOfColors('#ccf000')).toEqual({ isValid: false, error: 'The color must be one of "colors"' });
    });

    test('return invalid result with error message defined as function', () => {
        oneOfColors = oneOf(color => `${color} is not one of "colors"`, colors);

        expect(oneOfColors('#ccf000')).toEqual({ isValid: false, error: '#ccf000 is not one of "colors"' });
    });
});
