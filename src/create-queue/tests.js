import createValidator from '../create-validator';
import required from '../validators/required';
import createQueue from '.';

const isNumber = createValidator(value => typeof value === 'number');
const isEven = createValidator(value => value % 2 === 0);

describe('createQueue', () => {
    const queue = createQueue(
        required('The value must be defined'),
        isNumber('The value must be a number'),
        isEven('The value must be an even number')
    );

    test('returns a function', () => {
        expect(typeof queue).toBe('function');
    });

    test('returns valid result', () => {
        const result = queue(2);

        expect(result).toEqual({ isValid: true, error: '' });
    });

    test('return invalid result with error message', () => {
        const result = queue(3);

        expect(result).toEqual({ isValid: false, error: 'The value must be an even number' });
    });

    test('do not call next if previous validator return invalid result', () => {
        const first = jest.fn();
        const second = jest.fn();
        const third = jest.fn();

        first.mockReturnValue({ isValid: true, error: '' });
        second.mockReturnValue({ isValid: false, error: 'mock error' });
        third.mockReturnValue({ isValid: true, error: '' });

        const queue = createQueue(first, second, third);

        expect(queue('hi!')).toEqual({ isValid: false, error: 'mock error' });
        expect(first).toBeCalledWith('hi!');
        expect(second).toBeCalledWith('hi!');
        expect(third).not.toBeCalled();
    });
});
