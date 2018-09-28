import {FormControl} from '@angular/forms';
import ow, {BasePredicate} from 'ow';

/**
 * Utility validator to use `ow` in combination with form validation.
 *
 * @param errorName - Name of the property in the `error` object.
 * @param predicate - Predicate function to test the value of the form control.
 * @returns An Angular form validator.
 * @example
 *
 * formBuilder.group({
 * 	username: ['', owValidator('usernameRequired', ow.string.minLength(5))],
 * 	password: ['', owValidator('passwordInvalid', ow.string.minLength(8))],
 * 	quantity: [1, owValidator('quantityInvalid', ow.number.greaterThan(0))]
 * });
 */
export function owValidator(errorName: string, predicate: BasePredicate) {
	return (control: FormControl) => {
		try {
			ow(control.value, predicate);

			return null;
		} catch (error) {
			return {
				[errorName]: error.message
			};
		}
	};
}
