import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthResponseData } from 'src/app/models/auth-response.interface';
import { dbUser } from 'src/app/models/update.user.model';

import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private haveRole = false;
  private user: User | null = null;
  updateForm: FormGroup = new FormGroup({
    oldEmail: new FormControl('', [Validators.required, Validators.email]),
    newEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    giveAdmin: new FormControl(),
  });
  deleteForm: FormGroup = new FormGroup({
    delEmail: new FormControl('', [Validators.required, Validators.email])
  });

  error: string | null = null;
  isLoading = false;


  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        const decodedToken: any = jwt_decode(user?.token || '')
        this.haveRole = decodedToken.user_role === 'admin';
        if (!this.haveRole) {
          this.router.navigate(['/404'])
        }
      } else {
        this.router.navigate(['/404'])
      }
    })
  }

  updateUser(): void {
    if (this.getUpdateForm.oldEmail.value !== 'admin@admin.com') {
      this.isLoading = true;
      const updatedUser = new dbUser(
        this.getUpdateForm.oldEmail.value,
        this.getUpdateForm.name.value,
        this.getUpdateForm.password.value,
        this.getUpdateForm.giveAdmin.value ? 'admin' : 'user',
        this.getUpdateForm.newEmail.value
      );
      this.usersService.updateUser(updatedUser)
        .subscribe(
          (data: AuthResponseData) => {
            console.log(data)
            this.isLoading = false;
          },
          (error: any) => {
            this.handlingError(error);
            this.isLoading = false;
          })
    } else {
      this.error = "Az adminisztrátor email címe állandó!"
    }
    this.getUpdateForm.reset;
  }

  deleteUser() {
    this.isLoading = true;
    this.usersService.deleteUser(this.getDeleteForm.delEmail.value)
      .subscribe(
        (data: any) => {
          this.isLoading = false;
        },
        (error: any) => {
          this.isLoading = false;
          this.handlingError(error);
        }
      )
  }

  handlingError(error: any) {
    switch (error.status) {
      case 500: this.error = "Sikertelen azonosítás!";
        break;
      case 401: this.error = "Hibás felhasználónév vagy jelszó.";
        break;
    }
  }

  get getUpdateForm() {
    return this.updateForm.controls;
  }

  get getDeleteForm() {
    return this.deleteForm.controls;
  }
}
