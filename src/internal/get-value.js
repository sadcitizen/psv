import isExists from 'doremi/is/is-exists';
import isUndefined from 'doremi/is/is-undefined';

export default function (target, key, def) {
    let obj = target;
    const parts = key.split('.');
    const last = parts.pop();

    /* eslint-disable no-cond-assign */
    while (key = parts.shift()) {
        obj = obj[key];
        if (!isExists(obj)) {
            return def;
        }
    }
    /* eslint-enable no-cond-assign */

    return !isUndefined(obj[last]) ? obj[last] : def;
}
