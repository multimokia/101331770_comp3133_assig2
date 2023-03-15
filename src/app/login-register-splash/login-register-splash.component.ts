import { Component } from "@angular/core";

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
        >
            <mat-tab label="LOGIN">
                <app-login/>
            </mat-tab>
            <mat-tab label="REGISTER">
                <app-register/>
            </mat-tab>
        </mat-tab-group>
  `,
    styles: [
    ]
})
export class LoginRegisterSplashComponent {

}
