import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MessageDialogueComponent } from "../message-dialogue/message-dialogue.component";
import { CookieService } from "ngx-cookie-service";
import { AuthApiServiceService } from "src/app/auth-api-service.service";
import { User } from "src/app/shared/types/User";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs";

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

    constructor(
        private auth: AuthApiServiceService,
        private router: Router,
        private dialogue: MatDialog,
        private cookieService: CookieService
    ) { }

    async handleSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        this.auth.login(
            this.loginForm.value.username as string,
            this.loginForm.value.password as string
        )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.dialogue.open(MessageDialogueComponent, {
                        data: {
                            title: "Error",
                            message: error.error
                        }
                    });

                    throw error;
                })
            )
            .subscribe(
                (data: User) => {
                    this.cookieService.set("user_token", data.token);
                    this.router.navigate(["/dashboard"]);
                }
            );
    }
}
