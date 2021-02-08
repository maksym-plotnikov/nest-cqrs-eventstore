import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnsNavigator } from 'ngx-onsenui';
import { InitialPageComponent } from '../initial-page/initial-page.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'ons-page[login-page]',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    loggedIn!: boolean;
    loginForm!: FormGroup;

    constructor(
        private navigator: OnsNavigator,
        private fb: FormBuilder,
        private auth: AuthService,
    ) {}

    ngOnInit() {
        this.createForm();
    }

    login() {
        const { user, password } = this.loginForm.value;
        this.loggedIn = this.auth.logIn(user, password);
        if (this.loggedIn) {
            this.navigator.nativeElement.replacePage(InitialPageComponent);
        }
    }

    createForm() {
        this.loginForm = this.fb.group({
            user: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }
}
