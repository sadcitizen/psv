import getValue from 'doremi/object/get-value';

export default (validator, key) => value => validator(getValue(value, key));
