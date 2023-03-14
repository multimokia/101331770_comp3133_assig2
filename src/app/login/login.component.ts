import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Apollo, gql } from 'apollo-angular';

@Component({
    selector: 'app-login',
    template: `
        <div class="flex flex-col items-center px-20 py-10 rounded-lg">
            <div>
                <h1 class="text-2xl text-white w-full text-left">Login</h1>
                <form
                    [formGroup]="loginForm"
                    (ngSubmit)="handleSubmit()"
                    class="flex flex-col items-center"
                >
                    <mat-form-field>
                        <mat-label>Username</mat-label>
                        <input matInput formControlName="username">
                    </mat-form-field>
                    <mat-form-field>
                        <mat-label>Password</mat-label>
                        <input matInput type="password" formControlName="password">
                    </mat-form-field>
                    <button mat-raised-button color="primary">Login</button>
                </form>
            </div>
        </div>
    `
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private apollo: Apollo) { }

    handleSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        this.apollo.query({
            query: gql`
                query {
                    Login(username: "${this.loginForm.value.username}", password: "${this.loginForm.value.password}") {
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
