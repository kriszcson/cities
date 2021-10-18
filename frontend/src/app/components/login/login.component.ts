import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthResponseData } from '../../models/auth-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  error: string | null = null;
  isLoading = false;
  isLoginMode = true;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  switchMode(isLoginMode: any) {
    this.isLoginMode = isLoginMode;
  }

  getMode() {
    return this.isLoginMode ? 'Bejelentkezés' : 'Regisztráció';
  }

  onSubmit(): void {
    this.isLoading = true;
    this.isLoginMode ? this.login() : this.signup();
  }

  login() {
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

  signup() {
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

  }

  handlingError(error: any) {
    switch (error.status) {
      case 500: this.error = "Belső hiba!";
        break;
      case 401: this.error = "Hibás felhasználónév vagy jelszó.";
        break;
      case 409: this.error = "A megadott e-mail cím már regisztrálva van.";
        break;
    }
  }

  get form() {
    return this.signinForm.controls;
  }

}
