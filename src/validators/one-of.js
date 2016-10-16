import createValidator from '../create-validator';

export default createValidator((value, values) => values.indexOf(value) !== -1);
