import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import test from 'ava';
import ow from 'ow';
import {owValidator} from '.';

const formBuilder = new FormBuilder();

const getErrors = (form: FormGroup, path: string) => (form.get(path) as FormControl).errors;

test('single form control', t => {
	const form = formBuilder.group({
		username: ['', owValidator('username', ow.string.minLength(10))]
	});

	form.patchValue({
		username: 'foo'
	});

	t.deepEqual(getErrors(form, 'username'), {
		username: 'Expected string to have a minimum length of `10`, got `foo`'
	});
});

test('multiple form controls', t => {
	const form = formBuilder.group({
		firstName: ['', owValidator('firstNameRequired', ow.string.nonEmpty)],
		name: ['', owValidator('nameRequired', ow.string.nonEmpty)],
		email: ['', owValidator('emailInvalid', ow.string.nonEmpty.includes('@'))],
		password: ['', owValidator('passwordInvalid', ow.string.minLength(6))]
	});

	form.patchValue({
		firstName: '',
		name: '🌈',
		email: 'foo',
		password: 'hello'
	});

	t.deepEqual(getErrors(form, 'firstName'), {
		firstNameRequired: 'Expected string to not be empty'
	});

	t.deepEqual(getErrors(form, 'email'), {
		emailInvalid: 'Expected string to include `@`, got `foo`'
	});

	t.deepEqual(getErrors(form, 'password'), {
		passwordInvalid: 'Expected string to have a minimum length of `6`, got `hello`'
	});
});
