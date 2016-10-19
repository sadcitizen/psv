import getValue from 'doremi/object/get-value';

export default validators => value => {
    const keys = Object.keys(validators);
    let isValid = true;
    let errors = {};

    let result;

    keys.forEach(key => {
        result = validators[key](getValue(value, key), value);

        if (!result.isValid) {
            isValid = false;
            errors[key] = result.error;
        }
    });

    return { isValid, errors };
}
