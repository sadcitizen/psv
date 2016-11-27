import createValidator from '../../create-validator';

export default createValidator((value, maxValue) => value < maxValue);
