import createValidator from '../../create-validator';

export default createValidator((value, pattern) => pattern.test(value));
