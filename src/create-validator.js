export default function (message, definition) {
    return function (value) {
        let error = typeof message === 'function' ? message(value) : message;
        let isValid = false;

        if (definition(value)) {
            isValid = true;
            error = '';
        }

        return { isValid, error };
    }
}
