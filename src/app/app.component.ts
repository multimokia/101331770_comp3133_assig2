import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <div class="w-full h-full font-[GeosansLight] bg-[url('https://www.pixelstalk.net/wp-content/uploads/2016/06/Ice-HD-Picture.jpeg')]">
            <app-navbar/>
            <div class="flex flex-col items-center justify-center h-full">
                <div class="w-fit text-white">
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
                        "
                    >
                        <mat-tab label="LOGIN">
                            <app-login/>
                        </mat-tab>
                        <mat-tab label="REGISTER">
                            <app-register/>
                        </mat-tab>
                    </mat-tab-group>
                </div>
            </div>
        </div>
        <router-outlet></router-outlet>
    `,
    styleUrls: ["./app.component.css"]
})
export class AppComponent {

}
