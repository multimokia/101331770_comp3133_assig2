import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Apollo, gql } from "apollo-angular";

@Component({
    selector: "app-register",
    template: `
    <div class="flex flex-col items-start px-20 py-10 rounded-lg space-y-2">
        <h1 class="text-2xl text-white">Register</h1>
        <form
            [formGroup]="registerForm"
            (ngSubmit)="handleSubmit()"
            class="flex flex-col items-center"
        >
            <mat-form-field>
                <mat-label>Username</mat-label>
                <input matInput formControlName="username">
                <mat-error *ngIf="registerForm.controls.username.invalid">
                    Username is required
                </mat-error>
            </mat-form-field>
            <mat-form-field>
                <mat-label>Email</mat-label>
                <input matInput formControlName="email">
                <mat-error *ngIf="registerForm.controls.email.invalid">
                    Email is required
                </mat-error>
            </mat-form-field>
            <mat-form-field>
                <mat-label>Password</mat-label>
                <input matInput type="password" formControlName="password">
                <mat-error *ngIf="registerForm.controls.password.invalid">
                    Password is required
                </mat-error>
            </mat-form-field>
            <mat-form-field>
                <mat-label>Confirm Password</mat-label>
                <input matInput type="password" formControlName="passwordConfirmation">
                <mat-error *ngIf="registerForm.controls.passwordConfirmation.invalid">
                    Password Confirmation is required
                </mat-error>
            </mat-form-field>
            <button mat-raised-button color="primary">Register</button>
        </form>
  </div>
`
})
export class RegisterComponent {
    registerForm = new FormGroup({
        username: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(8)]),
        passwordConfirmation: new FormControl("", Validators.required)
    });

    constructor(private apollo: Apollo) { }

    handleSubmit() {
        if (this.registerForm.invalid) {
            return;
        }

        this.apollo.mutate({
            mutation: gql`
                mutation {
                    Signup(
                        username: "${this.registerForm.value.username}",
                        email: "${this.registerForm.value.email}",
                        password: "${this.registerForm.value.password}"
                    ) {
                        id
                        username
                    }
                }
            `
        }).subscribe(result => {
            console.log(result);
        });
    }
}
