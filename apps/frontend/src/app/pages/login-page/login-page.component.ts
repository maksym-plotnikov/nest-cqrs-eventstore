import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { isMobile } from 'src/app/utils';

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
        this.mobile = isMobile();
    }

    async login() {
        const { user, password } = this.loginForm.value;
        this.loggedIn = this.auth.logIn(user, password);
        if (this.loggedIn) {
            return this.mobile
                ? await this.router.navigate(['mobile'])
                : await this.router.navigate(['desktop']);
        } else {
            return Promise.reject('Could not login');
        }
    }

    createForm() {
        this.loginForm = this.fb.group({
            user: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    get user() {
        return this.loginForm.get('user') as FormControl;
    }

    get password() {
        return this.loginForm.get('password') as FormControl;
    }
}
