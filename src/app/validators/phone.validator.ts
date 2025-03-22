import parsePhoneNumberFromString from 'libphonenumber-js';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function phoneNumberValidator(region: string = 'RU'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const phoneNumber = parsePhoneNumberFromString(control.value, {defaultCountry: region as any});

    if (!phoneNumber || !phoneNumber.isValid()) {
      return { invalidPhoneNumber: true };
    }

    return null;
  };
}
