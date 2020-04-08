import { ValidatorFn, AbstractControl } from '@angular/forms';

export function checkPassword(password: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value === password ? null : { notMatch: true };
  };
}
