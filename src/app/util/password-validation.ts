import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function checkPasswordMatches(password: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value === password ? null : { notMatch: true };
  };
}

export function patternValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return regex.test(control.value) ? null : error;
  };
}
