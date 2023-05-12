import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/shared/types/User";

@Injectable({
    providedIn: "root"
})
export class AuthApiServiceService {
    constructor(private http: HttpClient) { }

    public login(username: string, password: string) {
        return this.http.post<User>("http://localhost:7880/auth/login", {
            username,
            password
        });
    }

    public register(username: string, email: string, password: string) {
        return this.http.post<User>("http://localhost:7880/auth/signup", {
            username,
            email,
            password
        });
    }

    public getUser(token: string) {
        return this.http.get<User>("http://localhost:7880/auth/user", {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }
}
