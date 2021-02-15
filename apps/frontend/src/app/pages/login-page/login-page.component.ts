import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onsPlatform } from 'ngx-onsenui';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ons-page[login-page]',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    loggedIn!: boolean;
    loginForm!: FormGroup;
    mobile!: boolean;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private auth: AuthService,
    ) {}

    ngOnInit() {
        this.createForm();
        this.mobile = this.isMobile();
    }

    async login() {
        const { user, password } = this.loginForm.value;
        this.loggedIn = this.auth.logIn(user, password);
        if (this.loggedIn) {
            return this.mobile
                ? await this.router.navigate(['mobile'])
                : await this.router.navigate(['desktop']);
        } else {
            return await Promise.reject('Could not login');
        }
    }

    createForm() {
        this.loginForm = this.fb.group({
            user: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    get user() {
        return this.loginForm.get('user');
    }

    get password() {
        return this.loginForm.get('password');
    }

    isMobile() {
        return this.getMobileOS() != 'other';
    }

    getMobileOS() {
        if (onsPlatform.isAndroid()) {
            return 'android';
        } else if (onsPlatform.isIOS()) {
            return 'ios';
        } else if (onsPlatform.isWP()) {
            return 'wp';
        } else {
            return 'other';
        }
    }
}
