import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import jwt_decode from 'jwt-decode';

import { AuthResponseData } from '../models/auth-response.interface';
import { User } from '../models/user.model';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    user = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any;

    constructor(
        private http: HttpClient,
        private readonly router: Router
    ) { }


    login(email: string, password: string): any {
        return this.http.post<AuthResponseData>
            (
                `${environment.BACKEND_URL}/auth/login`, { email, password }
            ).pipe(map(
                resData => {
                    this.handleAuthentication(resData);
                }), catchError((err) => {
                    return throwError(err);
                })
            )
    }

    signup(email: string, name: string, password: string): any {
        return this.http.post<AuthResponseData>
            (
                `${environment.BACKEND_URL}/auth/signup`, { user_email: email, user_name: name, user_password: password }
            ).pipe(map(
                resData => {
                    this.handleAuthentication(resData);
                }), catchError((err) => {
                    return throwError(err);
                })
            )
    }

    private handleAuthentication(resData: AuthResponseData): void {
        const decodedToken: any = jwt_decode(resData.accessToken);
        const tokenExpiration = new Date(decodedToken.exp * 1000);
        const user = new User(resData.email, resData.name, tokenExpiration, resData.accessToken, resData.refreshToken);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogIn(): void {
        if (localStorage.getItem('userData')) {
            const userData: {
                name: string,
                email: string,
                _tokenExpirationDate: Date,
                _token: string,
                _refreshToken: string,
            }
                = JSON.parse(localStorage.getItem('userData') || '');
            const loadedUser = new User(
                userData.email,
                userData.name,
                userData._tokenExpirationDate,
                userData._token,
                userData._refreshToken
            );
            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogOut(expirationDuration);
            }
            if (loadedUser.token) {
                this.user.next(loadedUser);
            }
        } else {
            return;
        }
    }

    logOut(): void {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
    }

    autoLogOut(expirationDuration: number): void {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }
}