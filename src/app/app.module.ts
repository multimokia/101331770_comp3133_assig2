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
import { HttpClientModule } from "@angular/common/http";
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
        LoginRegisterSplashComponent
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
        {
            provide: APOLLO_OPTIONS,
            useFactory(httpLink: HttpLink) {
                return {
                    cache: new InMemoryCache(),
                    link: httpLink.create({
                        uri: "http://localhost:7880/graphql",
                    }),
                };
            },
            deps: [HttpLink],
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
