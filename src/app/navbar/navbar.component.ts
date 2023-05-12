import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthApiServiceService } from "src/app/auth-api-service.service";

@Component({
    selector: "app-navbar",
    template: `
    <mat-toolbar
        class="
            bg-clip-padding
            backdrop-filter
            backdrop-blur-xl
            bg-opacity-60
            bg-gray-500
            border
            border-gray-200/50
            shadow-lg
            absolute
            float-left
            flex
            flex-row
            space-x-6
        "
    >
        <h1 class="text-white italic text-4xl">FERMATA.</h1>
        <h2 class="text-gray-200 font-bold text-2xl italic" *ngIf="!!username">{{ username }}</h2>
        <div class="flex flex-row flex-grow justify-end">
            <button mat-button routerLink="/" *ngIf="!!username" (click)="logout()">Logout <mat-icon>logout</mat-icon></button>
        </div>
    </mat-toolbar>
  `,
    styles: [
    ]
})
export class NavbarComponent {
    username = "";
    constructor(
        private cookieService: CookieService,
        private auth: AuthApiServiceService
    ) { }

    public fetchUsername() {
        // Only run this if we haven't already gotten the username
        if (this.username) {
            return this.username;
        }

        const token = this.cookieService.get("user_token");

        if (!token) {
            this.username = "";
            return "";
        }

        this.auth.getUser(token)
            .subscribe((user) => {
                this.username = user.username;
            });

        return this.username;
    }

    public logout(): void {
        this.cookieService.delete("user_token");
        this.username = "";
    }

    ngOnInit(): void {
        this.fetchUsername();
    }
}
