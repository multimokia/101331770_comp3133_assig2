import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { MaterialModule } from "./material/material.module";
import { RegisterComponent } from "./register/register.component";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { InMemoryCache } from "@apollo/client/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { EmployeelistComponent } from "./employeelist/employeelist.component";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { EditEmployeeDetailsComponent } from "./edit-employee-details/edit-employee-details.component";
import { ConfirmDialogueComponent } from "./confirm-dialogue/confirm-dialogue.component";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";
import { RouterModule, Routes } from "@angular/router";
import { LoginRegisterSplashComponent } from "./login-register-splash/login-register-splash.component";
import { AuthGuardService } from "./auth-guard.service";
import { MessageDialogueComponent } from "./message-dialogue/message-dialogue.component";
import { CookieService } from "ngx-cookie-service";
import { setContext } from "@apollo/client/link/context";

const routes: Routes = [
    { path: "", component: LoginRegisterSplashComponent, title: "Login" },
    { path: "dashboard", component: EmployeelistComponent, title: "Dashboard", canActivate: [ AuthGuardService ] },
    { path: "**", redirectTo: "" },
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        EmployeelistComponent,
        EmployeeDetailsComponent,
        EditEmployeeDetailsComponent,
        ConfirmDialogueComponent,
        CreateEmployeeComponent,
        LoginRegisterSplashComponent,
        MessageDialogueComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        ApolloModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: [
        CookieService,
        {
            provide: APOLLO_OPTIONS,
            useFactory(httpLink: HttpLink, cookieService: CookieService) {
                const http = httpLink.create({
                    uri: "http://localhost:7880/graphql",
                    headers: new HttpHeaders().set("authorization", `Bearer ${cookieService.get("user_token")}`)
                });

                const authLink = setContext((_, { headers }) => {
                    // get the authentication token from local storage if it exists
                    const token = cookieService.get("user_token");

                    // return the headers to the context so httpLink can read them
                    return {
                        headers: {
                            ...headers,
                            authorization: token ? `Bearer ${token}` : "",
                        }
                    };
                });

                return {
                    link: authLink.concat(http),
                    cache: new InMemoryCache(),
                };
            },
            deps: [HttpLink, CookieService],
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
