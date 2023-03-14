import { Component } from '@angular/core';
import { Apollo, gql, Subscription } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Employee } from '../shared/types/Employee';

@Component({
  selector: 'app-employeelist',
  template: `
    <p>
      employeelist works!
    </p>
  `,
  styles: [
  ]
})
export class EmployeelistComponent {
    employees: Observable<Employee[]>;
    private querySubscription: Subscription;

    constructor(private apollo: Apollo) { }

    ngOnInit() {
        // Do gql query for employees
        this.employees = this.apollo.watchQuery<Employee, Employee>({
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
        }).valueChanges.pipe(
            map((result) => {
                // @ts-ignore
                result.data && result.data.GetAllEmployees;
            })
        );
    }

    ngOnDestroy() {
        this.querySubscription.unsubscribe();
    }
}
