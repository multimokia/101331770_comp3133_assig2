import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Apollo, gql, QueryRef } from "apollo-angular";
import { ConfirmDialogueComponent } from "../confirm-dialogue/confirm-dialogue.component";
import { CreateEmployeeComponent } from "../create-employee/create-employee.component";
import { EditEmployeeDetailsComponent } from "../edit-employee-details/edit-employee-details.component";
import { EmployeeDetailsComponent } from "../employee-details/employee-details.component";
import { Employee } from "../shared/types/Employee";

type GetAllEmployeesQueryResponse = {
    GetAllEmployees: Employee[];
};

@Component({
    selector: "app-employeelist",
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
                w-[80vw]
            "
        >
            <h1 class="text-2xl text-white w-full text-left">Employees</h1>
            <mat-table
                class="bg-transparent"
                [dataSource]="employeesDataSource"
                matSort
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
                <ng-container matColumnDef="actions">
                    <mat-header-cell *matHeaderCellDef> Actions </mat-header-cell>
                    <mat-cell *matCellDef="let employee">
                        <button mat-button color="white" (click)="handleViewButtonClick(employee)">View</button>
                        <button mat-button color="white" (click)="handleEditButtonClick(employee)">Edit</button>
                        <button mat-button color="warn" (click)="handleDeleteButtonClick(employee)">Delete</button>
                    </mat-cell>
                </ng-container>

                <mat-header-row *matHeaderRowDef="displayCols"/>
                <mat-row *matRowDef="let rowData; columns: displayCols"/>
            </mat-table>
            <mat-paginator
                #paginator
                [pageSize]="5"
                [pageSizeOptions]="[5, 10, 20]"
                showFirstLastButtons
                class="w-full bg-transparent text-white"
            />
            <div class="w-full flex flex-row-reverse">
                <button mat-button color="secondary" (click)="handleCreateButtonClick()">Add Employee</button>
            </div>
        </div>
    `,
    styles: [
    ]
})
export class EmployeelistComponent implements OnInit {
    displayCols = ["id", "first_name", "last_name", "actions"];

    employeesDataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
    employeeQueryRef: QueryRef<GetAllEmployeesQueryResponse> | undefined;

    constructor(private apollo: Apollo, public dialogue: MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    /**
     * Set the paginator after the view init since this component will
     * be able to query its view for the initialized paginator.
     */
    ngAfterViewInit() {
        this.employeesDataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.employeesDataSource.paginator = this.paginator;
        // Do gql query for employees
        this.apollo.watchQuery<GetAllEmployeesQueryResponse>({
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
        }).valueChanges.subscribe(result => {
            this.employeesDataSource.data = result.data.GetAllEmployees;
        });
    }

    handleViewButtonClick(employee: Employee) {
        this.dialogue.open(EmployeeDetailsComponent, {
            data: { employee }
        });
    }

    handleEditButtonClick(employee: Employee) {
        this.dialogue.open(EditEmployeeDetailsComponent, {
            data: employee
        });
    }

    handleDeleteButtonClick(employee: Employee) {
        this.dialogue.open(ConfirmDialogueComponent, {
            data: {
                title: "Delete Employee",
                message: `Are you sure you want to delete "${employee.first_name} ${employee.last_name}"?`
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this.apollo.mutate({
                    mutation: gql`
                        mutation {
                            DeleteEmployeeById(id: "${employee.id}") {
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
                    }],
                }).subscribe();
            }
        });
    }

    handleCreateButtonClick() {
        this.dialogue.open(CreateEmployeeComponent);
    }
}
