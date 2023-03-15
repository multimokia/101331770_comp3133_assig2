import { Component } from "@angular/core";

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
        <h1 class="text-white font-bold text-4xl">AGONY.</h1>
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
    public getUserName(): string {
        const user = localStorage.getItem("user");

        if (!user) {
            return "";
        }

        return JSON.parse(user).username;
    }

    public logout(): void {
        localStorage.removeItem("user");
    }
}
