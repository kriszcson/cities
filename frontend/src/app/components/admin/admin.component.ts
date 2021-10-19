import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthResponseData } from 'src/app/models/auth-response.interface';
import { GetUser } from 'src/app/models/get.user.model';
import { UpdateUser } from 'src/app/models/update.user.model';

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
  users: GetUser[];
  error: string | null = null;
  isLoading = false;
  pageSize = 5;
  page = 1;
  collectionSize: number;


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
        this.usersService.getUsers().subscribe((users) => {
          this.users = users;
          this.collectionSize = this.users.length;
        })
        if (!this.haveRole) {
          this.router.navigate(['/404'])
        }
      } else {
        this.router.navigate(['/404'])
      }
    })
  }

  deleteUser(id: string) {
    let conf = confirm('Biztosan törli a felhasználót?');
    if (conf === true) {
      this.isLoading = true;
      this.usersService.deleteUser(id)
        .subscribe(
          (data: any) => {
            this.isLoading = false;
            this.usersService.getUsers().subscribe((users) => {
              this.users = users;
            })
          },
          (error: any) => {
            this.isLoading = false;
            this.handlingError(error);
          }
        )
    }
  }

  handlingError(error: any) {
    switch (error.status) {
      case 500: this.error = "Sikertelen azonosítás!";
        break;
      case 401: this.error = "Hibás felhasználónév vagy jelszó.";
        break;
    }
  }
}
