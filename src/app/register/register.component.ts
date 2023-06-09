import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogueComponent } from "../message-dialogue/message-dialogue.component";
import { AuthApiServiceService } from "src/app/auth-api-service.service";
import { catchError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "app-register",
    template: `
    <div class="flex flex-col items-start px-20 py-10 rounded-lg space-y-2 overflow-hidden">
        <h1 class="text-2xl text-white">Register</h1>
        <form
            [formGroup]="registerForm"
            (ngSubmit)="handleSubmit()"
            class="flex flex-col items-center space-y-3 w-full"
        >
            <mat-form-field class="w-full" subscriptSizing="dynamic">
                <mat-label>Username</mat-label>
                <input matInput formControlName="username">
                <mat-error *ngIf="registerForm.controls.username.hasError('required')">
                    Username is required
                </mat-error>
                <mat-error *ngIf="registerForm.controls.username.hasError('duplicate')">
                    Username already in use
                </mat-error>
            </mat-form-field>
            <mat-form-field class="w-full" subscriptSizing="dynamic">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$">
                <mat-error *ngIf="registerForm.controls.email.hasError('required')">
                    Email is required
                </mat-error>
                <mat-error *ngIf="registerForm.controls.email.hasError('pattern')">
                    Email is invalid
                </mat-error>
                <mat-error *ngIf="registerForm.controls.email.hasError('duplicate')">
                    Email already in use
                </mat-error>
            </mat-form-field>
            <mat-form-field class="w-full" subscriptSizing="dynamic">
                <mat-label>Password</mat-label>
                <input matInput type="password" formControlName="password">
                <mat-error *ngIf="registerForm.controls.password.hasError('required')">
                    Password is required
                </mat-error>
                <mat-error *ngIf="registerForm.controls.password.hasError('minlength')">
                    Password must be at least 8 characters long
                </mat-error>
                <mat-error *ngIf="registerForm.controls.passwordConfirmation.hasError('mismatch')">
                    Passwords do not match
                </mat-error>
            </mat-form-field>
            <mat-form-field class="w-full" subscriptSizing="dynamic">
                <mat-label>Confirm Password</mat-label>
                <input matInput type="password" formControlName="passwordConfirmation">
                <mat-error *ngIf="registerForm.controls.passwordConfirmation.hasError('required')">
                    Confirm your password
                </mat-error>
                <mat-error *ngIf="registerForm.controls.passwordConfirmation.hasError('minlength')">
                    Password must be at least 8 characters long
                </mat-error>
                <mat-error *ngIf="registerForm.controls.passwordConfirmation.hasError('mismatch')">
                    Passwords do not match
                </mat-error>
            </mat-form-field>
            <button mat-raised-button color="primary" [disabled]="registerForm.invalid">Register</button>
        </form>
  </div>
`
})
export class RegisterComponent {
    registerForm = new FormGroup({
        username: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(8)]),
        passwordConfirmation: new FormControl("", [Validators.required, Validators.minLength(8)])
    });

    JSON = JSON;
    constructor(private auth: AuthApiServiceService, public dialogue: MatDialog) { }

    handleSubmit() {
        if (this.registerForm.invalid) {
            return;
        }

        if (this.registerForm.value.password !== this.registerForm.value.passwordConfirmation) {
            this.registerForm.controls.passwordConfirmation.setErrors({ mismatch: true });
            this.registerForm.controls.password.setErrors({ mismatch: true });
            return;
        }

        this.auth.register(
            this.registerForm.value.username as string,
            this.registerForm.value.email as string,
            this.registerForm.value.password as string
        )
            .pipe(catchError((error: HttpErrorResponse) => {
                // Check for duplicate username
                if (error.error.includes("dup key: { username")) {
                    this.registerForm.controls.username.setErrors({ duplicate: true });
                }

                // Check for duplicate email
                if (error.error.includes("dup key: { email")) {
                    this.registerForm.controls.email.setErrors({ duplicate: true });
                }

                // Failsafe
                this.dialogue.open(MessageDialogueComponent, {
                    data: {
                        title: "Error",
                        message: "There was an error registering your account."
                    }
                });

                throw error;
            }))
            .subscribe(result => {
                this.dialogue.open(MessageDialogueComponent, {
                    data: {
                        title: "Success",
                        message: `Account ${result.username} has been successfully registered!`
                    }
                });
            });
    }
}
