import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditEmployeeDetailsComponent } from "./edit-employee-details.component";

describe("EditEmployeeDetailsComponent", () => {
    let component: EditEmployeeDetailsComponent;
    let fixture: ComponentFixture<EditEmployeeDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EditEmployeeDetailsComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EditEmployeeDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
