import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-login-register-splash",
    template: `
        <mat-tab-group
            class="
                bg-clip-padding
                backdrop-filter
                backdrop-blur-xl
                bg-opacity-60
                bg-gray-500
                border
                border-gray-200/50
                rounded-lg
                shadow-lg
                w-[30vw]
            "
            dynamicHeight="true"
        >
            <mat-tab label="LOGIN">
                <app-login/>
            </mat-tab>
            <mat-tab label="REGISTER">
                <app-register class="overflow-hidden"/>
            </mat-tab>
        </mat-tab-group>
  `,
    styles: [
    ]
})
export class LoginRegisterSplashComponent {
    constructor(private router: Router) { }
    ngOnInit() {
        // If the user is already logged in, redirect them to the home page
        if (localStorage.getItem("user")) {
            this.router.navigate(["/dashboard"]);
        }
    }
}
