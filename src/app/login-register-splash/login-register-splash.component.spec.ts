import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginRegisterSplashComponent } from "./login-register-splash.component";

describe("LoginRegisterSplashComponent", () => {
    let component: LoginRegisterSplashComponent;
    let fixture: ComponentFixture<LoginRegisterSplashComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ LoginRegisterSplashComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginRegisterSplashComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
