import { Component, OnInit } from "@angular/core";
import { Apollo, gql, QueryRef } from "apollo-angular";
import { map, Observable, of } from "rxjs";
import { Employee } from "../shared/types/Employee";

type GetAllEmployeesQueryResponse = {
    GetAllEmployees: Employee[];
};

@Component({
    selector: "app-employeelist",
    template: `
        <p>
        employeelist works!
        </p>
    `,
    styles: [
    ]
})
export class EmployeelistComponent implements OnInit {
    employees$: Observable<Employee[]> = of([]);
    employeeQueryRef: QueryRef<GetAllEmployeesQueryResponse> | undefined;

    constructor(private apollo: Apollo) { }

    ngOnInit() {
        // Do gql query for employees
        this.employeeQueryRef = this.apollo.watchQuery<GetAllEmployeesQueryResponse>({
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
        });

        // Subscribe to the query
        this.employees$ = this.employeeQueryRef.valueChanges.pipe(
            map((result) => result.data.GetAllEmployees)
        );
    }
}
