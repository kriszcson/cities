import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
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
  isLoginMode = true;
  @Output() isLoginEventEmitter: EventEmitter<boolean> = new EventEmitter();

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
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  getHaveRole(): boolean {
    return this.haveRole;
  }

  getUser() {
    return this.user;
  }

  getSignInOrUpString() {
    return this.isLoginMode ? 'Regisztráció' : 'Bejelentkezés';
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.isLoginEventEmitter.emit(this.isLoginMode);
  }

  logout() {
    this.authService.logOut();
  }
}
