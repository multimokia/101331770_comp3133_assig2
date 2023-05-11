import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

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
        <h1 class="text-white font-bold text-4xl">MOONLIGHT.</h1>
        <h2 class="text-gray-200 font-bold text-2xl italic" *ngIf="!!getUserName()">{{ getUserName() }}</h2>
        <div class="flex flex-row flex-grow justify-end">
            <button mat-button routerLink="/" *ngIf="!!getUserName()" (click)="logout()">Logout <mat-icon>logout</mat-icon></button>
        </div>
    </mat-toolbar>
  `,
    styles: [
    ]
})
export class NavbarComponent {
    constructor(private cookieService: CookieService) { }

    public getUserName(): string {
        const user = this.cookieService.get("user_token");

        if (!user) {
            return "";
        }

        return "temp";
    }

    public logout(): void {
        this.cookieService.delete("user_token");
    }
}
