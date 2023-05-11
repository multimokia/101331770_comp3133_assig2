import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
import { CookieService } from "ngx-cookie-service";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthGuardService {
    constructor(
        private router: Router,
        private cookieService: CookieService,
        private apollo: Apollo
    ) { }

    async canActivate() {
        if (this.cookieService.check("user_token")) {
            return this._validateToken(this.cookieService.get("user_token"));
        }

        else {
            this.router.navigate(["/login"]);
            return false;
        }
    }


    async _validateToken(token: string) {
        const result = await firstValueFrom(this.apollo.query({
            query: gql`
                query {
                    ValidateLogin
                }
            `,
            context: {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        }));

        // @ts-expect-error ValidateLogin exists
        return result.data.ValidateLogin;
    }
}
