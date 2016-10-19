import getValue from './internal/get-value';

export default (fn, key) => (...options) => value => fn(...options)(getValue(value, key));
