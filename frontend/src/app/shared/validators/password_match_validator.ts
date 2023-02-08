import { AbstractControl } from '@angular/forms';

// Returns the validator function.
export const PasswordsMatchValidator = (
  passwordControlName: string,
  confirmPasswordControlName: string
) => {
  // Checks if password is the same as confirmPassword.
  const validator = (form: AbstractControl) => {
    const passwordControl = form.get(passwordControlName);
    const confirmPasswordControl = form.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) return;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ notMatch: true });
    } else {
      const errors = confirmPasswordControl.errors;

      if (!errors) return;

      // Removes the previous error, then sets the current error.
      delete errors.notMatch;
      confirmPasswordControl.setErrors(errors);
    }
  };

  return validator;
};
