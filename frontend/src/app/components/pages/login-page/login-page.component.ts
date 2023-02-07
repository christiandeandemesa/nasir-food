import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // Creates a login form and saves the returnUrl.
  // ngOnInit method is called right after Angular sets up this component.
  // Each key (e.g. email) has an array with an initial value (e.g. ''), and its validator(s).
  // snapshot means the latest value of activatedRoute.
  // queryParams would be all the params after the ?.
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  // Shorten code size.
  get fc() {
    return this.loginForm.controls;
  }

  // Logs in a user.
  submit() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) return;

    this.userService
      .login({
        email: this.fc.email.value,
        password: this.fc.password.value,
      })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }
}
