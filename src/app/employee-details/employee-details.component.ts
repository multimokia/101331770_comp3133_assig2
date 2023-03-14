import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Employee } from "../shared/types/Employee";

@Component({
    selector: "app-employee-details",
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
            w-[60vw]
        "
    >
        <h1 class="text-2xl text-white text-left w-full">Employee Details - <code class="py-1 px-2 bg-gray-600 rounded-md">{{ data.employee.id }}</code></h1>

        <mat-table
            class="bg-transparent"
            [dataSource]="dataSource"
            *ngIf="data.employee"
        >
            <ng-container matColumnDef="id">
                <mat-header-cell *matHeaderCellDef> ID </mat-header-cell>
                <mat-cell *matCellDef="let employee"> {{ employee.id }} </mat-cell>
            </ng-container>
            <ng-container matColumnDef="first_name">
                <mat-header-cell *matHeaderCellDef> First Name </mat-header-cell>
                <mat-cell *matCellDef="let employee"> {{ employee.first_name }} </mat-cell>
            </ng-container>
            <ng-container matColumnDef="last_name">
                <mat-header-cell *matHeaderCellDef> Last Name </mat-header-cell>
                <mat-cell *matCellDef="let employee"> {{ employee.last_name }} </mat-cell>
            </ng-container>
            <ng-container matColumnDef="email">
                <mat-header-cell *matHeaderCellDef> Email </mat-header-cell>
                <mat-cell *matCellDef="let employee"> {{ employee.email }} </mat-cell>
            </ng-container>
            <ng-container matColumnDef="gender">
                <mat-header-cell *matHeaderCellDef> Gender </mat-header-cell>
                <mat-cell *matCellDef="let employee"> {{ employee.gender }} </mat-cell>
            </ng-container>
            <ng-container matColumnDef="salary">
                <mat-header-cell *matHeaderCellDef> Salary </mat-header-cell>
                <mat-cell *matCellDef="let employee"> {{ employee.salary | currency }} </mat-cell>
            </ng-container>
            <mat-header-row *matHeaderRowDef="displayCols"/>
            <mat-row *matRowDef="let rowData; columns: displayCols"/>
        </mat-table>
    </div>
  `,
    styles: [
    ]
})
export class EmployeeDetailsComponent {
    dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
    displayCols = ["first_name", "last_name", "email", "gender", "salary"];

    constructor(@Inject(MAT_DIALOG_DATA) public data: {employee: Employee }) {
        this.dataSource.data = [data.employee];
    }
}
