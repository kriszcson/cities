import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AuthResponseData } from '../../models/auth-response.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  regForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  error: string | null = null;
  isLoading = false;
  isLoginMode = true;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  switchMode(isLoginMode: any): void {
    this.isLoginMode = isLoginMode;
  }

  getMode(): string {
    return this.isLoginMode ? 'Bejelentkezés' : 'Regisztráció';
  }

  onSubmit(): void {
    this.error = '';
    this.isLoading = true;
    this.isLoginMode ? this.login() : this.signup();
  }

  login(): void {
    this.authService.login(this.form.email.value, this.form.password.value)
      .subscribe(
        (data: AuthResponseData) => {
          this.router.navigate(['/'])
          this.isLoading = false;
        },
        (error: any) => {
          this.handlingError(error);
          this.isLoading = false;
        })
  }

  signup(): void {
    console.log(this.regForm);
    if (this.regForm.valid) {
      this.authService.signup(this.form.email.value, this.form.name.value, this.form.password.value)
        .subscribe(
          (data: AuthResponseData) => {
            this.router.navigate(['/'])
            this.isLoading = false;
          },
          (error: any) => {
            this.handlingError(error);
            this.isLoading = false;
          })
    } else {
      this.isLoading = false;
      this.error = "Nem megfelelő formátumban adta meg az adatokat!"
    }
  }

  handlingError(error: any): void {
    switch (error.status) {
      case 500: this.error = "Belső hiba!";
        break;
      case 401: this.error = "Hibás felhasználónév vagy jelszó.";
        break;
      case 409: this.error = "A megadott e-mail cím már regisztrálva van.";
        break;
    }
  }

  get form(): any {
    return this.regForm.controls;
  }

}
