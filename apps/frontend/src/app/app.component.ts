import { Component, OnInit } from '@angular/core';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'smplct-view-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    loggedIn = false;

    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.loggedIn = this.auth.isLoggedIn();
    }

    get initialPage() {
        if (this.loggedIn) {
            return InitialPageComponent;
        } else {
            return LoginPageComponent;
        }
    }
}
