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
        "
    >
        <h1 class="text-white font-bold text-4xl">AGONY.</h1>
    </mat-toolbar>
  `,
    styles: [
    ]
})
export class NavbarComponent {

}
