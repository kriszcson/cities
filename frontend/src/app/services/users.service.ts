import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { dbUser } from "../models/update.user.model";

@Injectable()
export class UsersService {

    constructor(
        private http: HttpClient,
    ) { }

    updateUser(user: dbUser): any {
        return this.http.put<dbUser>(
            `${environment.BACKEND_URL}/users`, {
            user_email: user.oldEmail,
            user_name: user.name,
            user_password: user.password,
            user_role: user.role,
            user_new_email: user.newEmail
        })
    }

    deleteUser(email: string): any {
        return this.http.delete<any>(
            `${environment.BACKEND_URL}/users/${email}`)
    }
}