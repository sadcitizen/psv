import { expect } from 'chai';
import createQueue from '../create-queue';
import createSchema from '.';
import createValidator from '../create-validator';
import withPredicate from '../with-predicate';
import withProperty from '../with-property';
import greaterThan from '../validators/greater-than';
import pattern from '../validators/pattern';
import required from '../validators/required';

describe('createSchema', () => {
    const letters = /^[a-zA-Z]+$/;
    const lengthValidator = (field, limit) => withProperty(greaterThan((value, minValue) => `${field} must have at least ${minValue + 1} characters`)(limit), 'length')

    const firstNameValidator = createQueue(
        required('First name must be defined')(),
        pattern('Incorrect first name')(letters)
    );

    const lastNameValidator = withPredicate(pattern('Incorrect last name')(letters), value => !!value.length);

    const loginValidator = createQueue(
        required('Login must be defined')(),
        lengthValidator('Login', 4)
    );

    const emailValidator = createQueue(
        required('Email must be defined')(),
        pattern('Incorrect email')(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
    );

    const passwordValidator = createQueue(
        required('Password must be defined')(),
        lengthValidator('Password', 5)
    );

    const passwordConfirmPredicate = (passwordConfirm, fields) => passwordConfirm === fields.password;
    const passwordConfirmValidator = createValidator(passwordConfirmPredicate)('Passwords do not match')();

    const registerFormSchema = createSchema({
        firstName: firstNameValidator,
        lastName: lastNameValidator,
        login: loginValidator,
        email: emailValidator,
        password: passwordValidator,
        passwordConfirm: passwordConfirmValidator
    });

    it('return valid result', () => {
        const form = {
            firstName: 'John',
            lastName: '',
            login: 'johndoe',
            email: 'john.doe@mail.com',
            password: 'qwerty123',
            passwordConfirm: 'qwerty123'
        };

        const result = registerFormSchema(form);

        expect(result).to.have.property('isValid')
            .that.is.a('boolean')
            .that.equal(true);

        expect(result).to.have.property('errors')
            .that.is.a('object')
            .that.deep.equal({});
    });

    it('return invalid result', () => {
        const form = {
            firstName: 'John22',
            lastName: 'Doe22',
            login: 'jdoe',
            email: 'john.doe#mail.com',
            password: '',
            passwordConfirm: 'qwerty123'
        };

        const errors = {
            firstName: 'Incorrect first name',
            lastName: 'Incorrect last name',
            login: 'Login must have at least 5 characters',
            email: 'Incorrect email',
            password: 'Password must be defined',
            passwordConfirm: 'Passwords do not match'
        };

        const result = registerFormSchema(form);

        expect(result).to.have.property('isValid')
            .that.is.a('boolean')
            .that.equal(false);

        expect(result).to.have.property('errors')
            .that.is.a('object')
            .that.deep.equal(errors);
    });
});
