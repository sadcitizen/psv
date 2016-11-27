import trim from 'doremi/string/trim';
import createValidator from '../../create-validator';

export default createValidator(value => !!trim(value).length);
