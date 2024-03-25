import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {LoginService} from "../../services/login.service";
import {LoginModel} from "../../models/login.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatButton,
    MatLabel,
    MatCard,
    MatCardContent,
    MatCardTitle,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get passwordHasErrors(): boolean {
    return !!this.loginForm.get('password')?.errors?.['required'];
  }

  get usernameHasErrors(): boolean {
      return !!this.loginForm.get('username')?.errors?.['required'];
  }

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  /**
   * send the login request and save token
   * TODO: handle errors gracefully
   * @protected
   */
  protected onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login({ ...this.loginForm.value } as LoginModel)
        .subscribe((jwtToken) => {
          localStorage.setItem('token', jwtToken.token);
          // successful login
          this.router.navigate(['/home']).then();
      });
    }
  }
}
