import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface TestTitle {
    message: string;
}

@Component({
    selector: 'smplct-view-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title: string;

    constructor(private http: HttpClient) {
        this.fetch();
    }

    fetch() {
        this.http
            .get<TestTitle>('/api/auth/test')
            .subscribe(t => (this.title = t.message));
    }
}
