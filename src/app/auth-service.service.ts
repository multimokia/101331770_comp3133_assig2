import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { map } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthServiceService {

    constructor(private apollo: Apollo) { }

    login(username: string, password: string) {
        return this.apollo.mutate({
            mutation: gql`
                mutation {
                    Login(username: "${username}", password: "${password}") {
                        id
                        username
                        email
                    }
                }
            `
        })
            .pipe(
                map((response) => {
                    return response.data;
                })
            );
    }
}
