import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatButtonModule
  ],
  template: `
    <section class="register-container">
      <form [formGroup]="registerForm">
        <h2>Register</h2>
        <mat-form-field>
          <mat-label>Username</mat-label>
          <input 
            matInput
            type="text"
            required=""
            autocomplete="off"
            formControlName="username"
          />
          @if (username?.hasError('required')) {
            <mat-error>Username is required.</mat-error>
          }
          @if (username?.hasError('minlength')) {
            <mat-error>Username must be at least 4 characters long.</mat-error>
          }
        </mat-form-field>
        <mat-form-field>
          <mat-label>E-mail</mat-label>
          <input 
            matInput
            type="text"
            required=""
            autocomplete="off"
            formControlName="email"
          />
          @if (email?.hasError('required')) {
            <mat-error>Email is required.</mat-error>
          }
          @if (email?.hasError('invalidEmail')) {
            <mat-error>Email needs to be a valid email.</mat-error>
          }
        </mat-form-field>
        <mat-form-field>
          <mat-label>Password</mat-label>
          <input 
            matInput
            type="password"
            required=""
            autocomplete="off"
            formControlName="password"
          />
          @if (password?.hasError('required')) {
            <mat-error>Password is required.</mat-error>
          }
          @if (password?.hasError('invalidPassword')) {
            <mat-error>Password must have letters and numbers.</mat-error>
          }
        </mat-form-field>
        <mat-form-field>
          <mat-label>Confirm Password</mat-label>
          <input 
            matInput
            type="password"
            required=""
            autocomplete="off"
            formControlName="confirmPassword"
            pattern="{{registerForm.value.password}}"
          />
          @if (confirmPassword?.hasError('required')) {
            <mat-error>Confirm password is required.</mat-error>
          }
          @if (registerForm.hasError('pwdNotEqual')) {
            <mat-error>Passwords must match.</mat-error>
          }
        </mat-form-field>
        <button 
          type="submit" 
          mat-flat-button
          [disabled]="!registerForm.valid"
        >
          Register
        </button>
        <a routerLink="/login" mat-button>
          Already have an account
        </a>
      </form>
    </section>
  `,
  styleUrl: "../styles/register.component.css"
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [
      Validators.required,
      this.emailValidator(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ]),
  }, { validators: this.passwordMatchValidator() })

  constructor(private router: Router) {}

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  emailValidator(emailRegex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: {value: control.value} }
    }
  }

  passwordValidator(pwdRegex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = pwdRegex.test(control.value);
      return valid ? null : { invalidPassword: "Password is invalid" }
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pwd = control.get('password');
      const confirmPwd = control.get('confirmPassword');

      return pwd && confirmPwd && pwd.value === confirmPwd.value ? null : { pwdNotEqual: true }
    }
  }

  handleSubmit(): void {
    this.router.navigate(["/login"])
  }
}