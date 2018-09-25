import {FormControl} from '@angular/forms';
import ow from 'ow';

/**
 * Utility validator to use `ow` in combination with form validation.
 *
 * @param predicate - Predicate function to test the value of the form control.
 * @returns An Angular form validator.
 * @example
 *
 * formBuilder.group({
 * 	username: ['', owValidator(ow.string.minLength(5))],
 * 	password: ['', owValidator(ow.string.minLength(8))],
 * 	quantity: [1, owValidator(ow.number.greaterThan(0))]
 * });
 */
export function owValidator(predicate: any) {
	return (control: FormControl) => {
		try {
			ow(control.value, predicate);

			return null;
		} catch (err) {
			const label = (predicate as any).context.label.replace(/`/g, ''); // tslint:disable-line

			return {
				[label]: err.message
			};
		}
	};
}
