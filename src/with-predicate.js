export default (fn, predicate) => (...options) => value => predicate(value, ...options)
    ? fn(...options)(value)
    : { isValid: true, error: '' };
