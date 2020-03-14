import createValidator from '../../create-validator';

export default createValidator((value, minValue) => value >= minValue);
