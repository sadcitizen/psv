export default definition => (message, ...options) => (value, fields) => {
    let error = typeof message === 'function' ? message(value, ...options) : message;
    let isValid = false;

    if (options.length ? definition(value, ...options, fields) : definition(value, fields)) {
        isValid = true;
        error = '';
    }

    return { isValid, error };
}
