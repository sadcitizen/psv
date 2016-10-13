export default function (message, definition) {
    return function (value) {
        let error = '';
        let isValid = false;

        if (definition(value)) {
            isValid = true;
            error = typeof message === 'function' ? message(value) : message;
        }

        return { isValid, error };
    }
}
