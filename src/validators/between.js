import createValidator from '../create-validator';

export default createValidator((value, minValue, maxValue) => value > minValue && value < maxValue);
