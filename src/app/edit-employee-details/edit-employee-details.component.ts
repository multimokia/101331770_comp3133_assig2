import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Apollo, gql } from "apollo-angular";
import { Employee } from "../shared/types/Employee";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-edit-employee-details",
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
            <form [formGroup]="editEmployeeForm" class="flex flex-col gap-4 w-full" (ngSubmit)="handleSubmit()">
                <mat-form-field>
                    <mat-label color="#ff0000">First Name</mat-label>
                    <input matInput formControlName="first_name" />
                    <mat-error *ngIf="editEmployeeForm.get('first_name')?.hasError('required')">
                        First Name is required
                    </mat-error>
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Last Name</mat-label>
                    <input matInput formControlName="last_name" />
                    <mat-error *ngIf="editEmployeeForm.get('last_name')?.hasError('required')">
                        Last Name is required
                    </mat-error>
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Email</mat-label>
                    <input matInput formControlName="email" />
                    <mat-error *ngIf="editEmployeeForm.get('email')?.hasError('required')">
                        Email is required
                    </mat-error>
                </mat-form-field>
                <mat-label>Gender</mat-label>
                <mat-radio-group formControlName="gender">
                    <mat-radio-button value="male" [checked]="editEmployeeForm.value.gender === 'male'">Male</mat-radio-button>
                    <mat-radio-button value="female" [checked]="editEmployeeForm.value.gender === 'female'">Female</mat-radio-button>
                    <mat-radio-button value="other" [checked]="editEmployeeForm.value.gender === 'other'">Other</mat-radio-button>
                </mat-radio-group>
                <mat-form-field>
                    <mat-label>Salary</mat-label>
                    <input matInput formControlName="salary" pattern="[0-9]*"/>
                    <mat-error *ngIf="editEmployeeForm.get('salary')?.hasError('required')">
                        Salary is required
                    </mat-error>
                </mat-form-field>

                <div class="flex flex-row gap-4 w-full">
                    <button
                        mat-raised-button
                        color="primary"
                        class="w-full"
                        [disabled]="editEmployeeForm.invalid"
                    >
                        Confirm
                    </button>
                    <button mat-raised-button color="warn" class="w-full" (click)="dialogueRef.close()">Cancel</button>
                </div>
            </form>
        </div>
  `
})
export class EditEmployeeDetailsComponent {
    editEmployeeForm = new FormGroup({
        first_name: new FormControl(this.data.first_name, Validators.required),
        last_name: new FormControl(this.data.last_name, Validators.required),
        email: new FormControl(this.data.email, Validators.required),
        gender: new FormControl(this.data.gender, Validators.required),
        salary: new FormControl(this.data.salary, Validators.required),
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Employee,
        private apollo: Apollo,
        public dialogueRef: MatDialogRef<EditEmployeeDetailsComponent>
    ) { }

    handleSubmit() {
        if (this.editEmployeeForm.invalid) {
            return;
        }

        const { first_name, last_name, email, gender, salary } = this.editEmployeeForm.value;

        this.apollo.mutate({
            mutation: gql`
                mutation {
                    UpdateEmployeeById(
                        id: "${this.data.id}",
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
