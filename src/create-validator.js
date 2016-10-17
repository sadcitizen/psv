import stringify from './internal/stringify';

export default definition => message => (...options) => value => {
    let error = typeof message === 'function' ? message(stringify(value)) : message;
    let isValid = false;

    if (definition(value, ...options)) {
        isValid = true;
        error = '';
    }

    return { isValid, error };
}
