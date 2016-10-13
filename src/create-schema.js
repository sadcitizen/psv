export default function (validators) {
    return function (value) {
        const keys = Object.keys(validators);
        let isValid = true;
        let errors = {};

        let result;

        keys.forEach(key => {
            result = validators[key](value[key], value);

            if (!result.isValid) {
                isValid = false;
                errors[key] = result.error;
            }
        });

        return { isValid, errors };
    }
}
