import getValue from 'doremi/object/get-value';

export default (fn, key) => (...options) => value => fn(...options)(getValue(value, key));
