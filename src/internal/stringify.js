import type from 'doremi/is/type';

export default function (value) {
    const valueType = type(value);

    if (valueType === 'string') {
        return value;
    }

    if (valueType === 'undefined') {
        return 'undefined';
    }

    if (valueType === 'regexp') {
        return value.toString();
    }

    return JSON.stringify(value);
}
