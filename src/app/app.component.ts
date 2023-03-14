import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <div class="w-full h-full font-[GeosansLight] bg-[url('https://www.pixelstalk.net/wp-content/uploads/2016/06/Ice-HD-Picture.jpeg')]">
            <app-navbar/>
            <div class="flex flex-col items-center justify-center h-full">
                <div class="w-fit text-white">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>

    `,
    styleUrls: ["./app.component.css"]
})
export class AppComponent {

}
