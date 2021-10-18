import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  private haveRole = false;
  private user: User | null = null;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        const decodedToken: any = jwt_decode(user?.token || '')
        this.haveRole = decodedToken.user_role === 'admin';
      }
    })
  }

  getHaveRole(): boolean {
    return this.haveRole;
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.authService.logOut();
  }
}
