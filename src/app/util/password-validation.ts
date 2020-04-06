import { FormGroup } from '@angular/forms';

export function checkPassword(group: FormGroup) {
  return group.controls.passwordControl.value ===
    group.controls.passwordConfirmationControl.value
    ? group.controls.passwordConfirmationControl.setErrors(null)
    : group.controls.passwordConfirmationControl.setErrors({
        notMatch: true,
      });
}
