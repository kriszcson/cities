import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,) {
    }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot)
        : boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(take(1),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                this.router.navigate(['login']);
                return false;
            }))
    }
}