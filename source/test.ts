import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import test from 'ava';
import ow from 'ow';
import {owValidator} from '.';

const formBuilder = new FormBuilder();

const getErrors = (form: FormGroup, path: string) => (form.get(path) as FormControl).errors;

test('single form control', t => {
	const form = formBuilder.group({
		username: ['', owValidator(ow.string.minLength(10).label('username'))]
	});

	form.patchValue({
		username: 'foo'
	});

	t.deepEqual(getErrors(form, 'username'), {
		username: 'Expected string `username` to have a minimum length of `10`, got `foo`'
	});
});

test('multiple form controls', t => {
	const form = formBuilder.group({
		firstName: ['', owValidator(ow.string.nonEmpty.label('firstName'))],
		name: ['', owValidator(ow.string.nonEmpty.label('name'))],
		email: ['', owValidator(ow.string.nonEmpty.includes('@').label('email'))],
		password: ['', owValidator(ow.string.minLength(6).label('password'))]
	});

	form.patchValue({
		firstName: '',
		name: '🌈',
		email: 'foo',
		password: 'hello'
	});

	t.deepEqual(getErrors(form, 'firstName'), {
		firstName: 'Expected string `firstName` to not be empty'
	});

	t.deepEqual(getErrors(form, 'email'), {
		email: 'Expected string `email` to include `@`, got `foo`'
	});

	t.deepEqual(getErrors(form, 'password'), {
		password: 'Expected string `password` to have a minimum length of `6`, got `hello`'
	});
});
