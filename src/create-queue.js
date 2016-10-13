export default function (...validators) {
    return function (value) {
        let result;

        for (let i = 0, length = validators.length; i < length; i++) {
            result = validators[i](value);

            if (!result.isValid) {
                return result;
            }
        }

        return { isValid: true, error: '' }
    }
}
