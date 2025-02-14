import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "login-component",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    ReactiveFormsModule
  ],
  template: `
    <section class="login-container">
      <form [formGroup]="loginForm" (ngSubmit)="handleSubmit()">
        <h2>Login</h2>  
        <mat-form-field>
          <mat-label>Username</mat-label>
          <input 
            matInput
            type="text"
            required
            formControlName="username"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Password</mat-label>
          <input 
            matInput
            type="password"
            required
            formControlName="password"
          />
        </mat-form-field>
        <button 
          mat-flat-button
          [disabled]="!loginForm.valid"
        >
          Login
        </button>
        <a routerLink="/register" mat-button>
          Create Account
        </a>
      </form>
    </section>
  `,
  styleUrl: "../styles/login.component.css",
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private router: Router) {}

  handleSubmit(): void {
    this.router.navigate(["/home"])
  }
}