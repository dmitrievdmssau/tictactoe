import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function confirmPasswordValidator(passwordControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null;
    }

    const passwordControl = control.parent.get(passwordControlName);

    if (!passwordControl) {
      return null;
    }

    if (control.value !== passwordControl.value) {
      return { passwordsMismatch: true };
    }

    return null;
  };
}
