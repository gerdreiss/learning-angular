import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function mustContainSpecialCharacter(control: AbstractControl<string>) {
  const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (regex.test(control.value)) {
    return null;
  }
  return { doesNotContainSpecialCharacter: true };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        mustContainSpecialCharacter,
      ],
    }),
  });

  isEmailInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  isPasswordInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  onSubmit() {
    const email = this.form.value.email;
    const pass = this.form.value.password;
  }
}
