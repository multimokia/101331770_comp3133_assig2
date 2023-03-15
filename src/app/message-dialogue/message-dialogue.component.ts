import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-message-dialogue",
    template: `
    <div
        class="
            flex
            flex-col
            items-center
            px-20
            py-10
            rounded-lg
            !text-white
            bg-clip-padding
            backdrop-filter
            backdrop-blur-xl
            bg-opacity-60
            bg-gray-500
            border
            border-gray-200/50
            shadow-lg
            font-[GeosansLight]
        "
    >
        <h1 class="text-2xl text-white w-full text-left">{{ data.title }}</h1>
        <p class="text-white w-full text-left">{{ data.message }}</p>
        <div class="flex flex-row justify-end w-full">
            <button mat-button color="secondary" [mat-dialog-close]="false">
                Okay
            </button>
        </div>
    </div>
  `
})
export class MessageDialogueComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) { }
}
