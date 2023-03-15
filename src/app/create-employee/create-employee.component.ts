import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Apollo, gql } from "apollo-angular";

@Component({
    selector: "app-create-employee",
    template: `
        <div
            class="
                flex
                flex-col
                items-center
                px-20
                py-10
                rounded-lg
                !text-white
                bg-clip-padding
                backdrop-filter
                backdrop-blur-xl
                bg-opacity-60
                bg-gray-500
                border
                border-gray-200/50
                shadow-lg
                font-[GeosansLight]
            "
        >
            <h1 class="text-2xl text-white w-full text-left">Edit Employee Details</h1>
            <form [formGroup]="createEmployeeForm" class="flex flex-col gap-4 w-full" (ngSubmit)="handleSubmit()">
                <mat-form-field>
                    <mat-label>First Name</mat-label>
                    <input matInput formControlName="first_name" />
                    <mat-error *ngIf="createEmployeeForm.get('first_name')?.hasError('required')">
                        First Name is required
                    </mat-error>
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Last Name</mat-label>
                    <input matInput formControlName="last_name" />
                    <mat-error *ngIf="createEmployeeForm.get('last_name')?.hasError('required')">
                        Last Name is required
                    </mat-error>
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Email</mat-label>
                    <input matInput formControlName="email" pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"/>
                    <mat-error *ngIf="createEmployeeForm.get('email')?.hasError('required')">
                        Email is required
                    </mat-error>
                </mat-form-field>
                <mat-label>Gender</mat-label>
                <mat-radio-group formControlName="gender">
                    <mat-radio-button value="male" [checked]="createEmployeeForm.value.gender === 'male'">Male</mat-radio-button>
                    <mat-radio-button value="female" [checked]="createEmployeeForm.value.gender === 'female'">Female</mat-radio-button>
                    <mat-radio-button value="other" [checked]="createEmployeeForm.value.gender === 'other'">Other</mat-radio-button>
                </mat-radio-group>
                <mat-form-field>
                    <mat-label>Salary</mat-label>
                    <input matInput formControlName="salary" pattern="[0-9]*"/>
                    <mat-error *ngIf="createEmployeeForm.get('salary')?.hasError('required')">
                        Salary is required
                    </mat-error>
                </mat-form-field>

                <div class="flex flex-row gap-4 w-full">
                    <button
                        mat-raised-button
                        color="primary"
                        class="w-full"
                        [disabled]="createEmployeeForm.invalid"
                    >
                        Create
                    </button>
                    <button mat-raised-button color="warn" class="w-full" (click)="dialogueRef.close()">Cancel</button>
                </div>
            </form>
        </div>
`
})
export class CreateEmployeeComponent {
    createEmployeeForm = new FormGroup({
        first_name: new FormControl("", Validators.required),
        last_name: new FormControl("", Validators.required),
        email: new FormControl("", Validators.required),
        gender: new FormControl("", Validators.required),
        salary: new FormControl("", Validators.required),
    });

    constructor(
        private apollo: Apollo,
        public dialogueRef: MatDialogRef<CreateEmployeeComponent>
    ) { }

    handleSubmit() {
        if (this.createEmployeeForm.invalid) {
            return;
        }

        const { first_name, last_name, email, gender, salary } = this.createEmployeeForm.value;

        this.apollo.mutate({
            mutation: gql`
                mutation {
                    CreateEmployee(
                        employeeData: {
                            first_name: "${first_name}",
                            last_name: "${last_name}",
                            email: "${email}",
                            gender: "${gender}",
                            salary: ${salary}
                        }
                    ) {
                        id
                    }
                }
            `,
            refetchQueries: [{
                query: gql`
                    query {
                        GetAllEmployees {
                            id
                            first_name
                            last_name
                            email
                            gender
                            salary
                        }
                    }
                `
            }]
        }).subscribe();

        this.dialogueRef.close();
    }
}
