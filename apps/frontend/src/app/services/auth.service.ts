import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    isLoggedIn() {
        const loggedIn = JSON.parse(localStorage.getItem('currentUser') as string);
        if (loggedIn) {
            return Object.keys(loggedIn).includes('user');
        }
        return false;
    }

    logIn(user: string, password: string) {
        localStorage.setItem('currentUser', JSON.stringify({ user, password }));
        return true;
    }

    logout() {
        localStorage.removeItem('currentUser');
        return false;
    }
}
