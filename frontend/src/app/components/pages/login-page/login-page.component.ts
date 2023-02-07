import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  // Creates a login form.
  // ngOnInit method is called right after Angular sets up this component.
  // Each key (e.g. email) has an array with an initial value (e.g. ''), and its validator(s).
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Shorten code size.
  get fc() {
    return this.loginForm.controls;
  }

  // Fakes a login form submission by sending an alert.
  submit() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) return;

    alert(`email: ${this.fc.email.value}, password: ${this.fc.password.value}`);
  }
}
