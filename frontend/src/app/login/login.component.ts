import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { City } from '../models/city.model';
import { User } from '../models/user.model';
import { CityService } from '../services/cities.service';
import { AuthService } from './auth/auth.service';
import { AuthResponseData } from './models/auth-response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  error: string | null = null;
  isLoading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cityService: CityService,
  ) { }

  ngOnInit(): void {
  }


  onSubmit(): void {
    this.isLoading = true;
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

  handlingError(error: any) {
    switch (error.status) {
      case 500: this.error = "Sikertelen azonosítás!";
        break;
      case 401: this.error = "Hibás felhasználónév vagy jelszó.";
        break;
    }
  }

  get form() {
    return this.signinForm.controls;
  }

  getCities() {
    this.cityService.getCities().subscribe(
      (data: City[]) => {
        console.log(data);
      }, (err) => {

      })
  }
}
