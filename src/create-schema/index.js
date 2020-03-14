export default schema => fields => {
    const keys = Object.keys(schema);
    let isValid = true;
    let errors = {};

    let result;

    keys.forEach(key => {
        result = schema[key](fields[key], fields);

        if (!result.isValid) {
            isValid = false;
            errors[key] = result.error;
        }
    });

    return { isValid, errors };
}
