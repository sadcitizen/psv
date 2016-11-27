export default (validator, predicate) => value => predicate(value)
    ? validator(value)
    : { isValid: true, error: '' };
