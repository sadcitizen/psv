import createValidator from '../../create-validator';

export default createValidator(value => value !== null && value !== undefined && Boolean(String(value).trim().length));
