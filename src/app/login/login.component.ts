import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
import { MessageDialogueComponent } from "../message-dialogue/message-dialogue.component";

@Component({
    selector: "app-login",
    template: `
        <div class="flex flex-col items-center px-20 py-10 rounded-lg">
            <div class="w-full">
                <h1 class="text-2xl text-white w-full text-left">Login</h1>
                <form
                    [formGroup]="loginForm"
                    (ngSubmit)="handleSubmit()"
                    class="flex flex-col items-center"
                >
                    <mat-form-field class="w-full">
                        <mat-label>Username</mat-label>
                        <input matInput formControlName="username">
                        <mat-error *ngIf="loginForm.controls.username.invalid">
                            Username is required
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field class="w-full">
                        <mat-label>Password</mat-label>
                        <input matInput type="password" formControlName="password">
                        <mat-error *ngIf="loginForm.controls.password.invalid">
                            Password is required
                        </mat-error>
                    </mat-form-field>
                    <button mat-raised-button color="primary" [disabled]="loginForm.invalid">Login</button>
                </form>
            </div>
        </div>
    `
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
    });

    constructor(private apollo: Apollo, private router: Router, private dialogue: MatDialog) { }

    async handleSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        await this.apollo.query({
            query: gql`
                query {
                    Login(username: "${this.loginForm.value.username}", password: "${this.loginForm.value.password}") {
                        id
                        username
                        email
                    }
                }
            `
        }).subscribe(result => {
            // @ts-expect-error Login exists
            if (result.data.Login === null) {
                // Now we can show the error message
                this.dialogue.open(MessageDialogueComponent, {
                    data: {
                        title: "Error",
                        message: "Invalid credentials"
                    }
                });

                return;
            }

            else {
                // Store the user data in localStorage
                // @ts-expect-error Login exists
                localStorage.setItem("user", JSON.stringify(result.data.Login));
                // Navigate to the home page
                this.router.navigate(["/dashboard"]);
            }
        });
    }
}
