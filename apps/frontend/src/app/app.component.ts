import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { onsPlatform } from 'ngx-onsenui';
import { Subject } from 'rxjs';
import { AuthService } from './services/auth.service';
import { IPHONE_ONS_ATTRIBUTES } from '@smplct-view/shared/constants';

@Component({
    selector: 'smplct-view-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    loggedIn = false;
    iphoneAttrs: string[] = IPHONE_ONS_ATTRIBUTES;
    private resizeSubject = new Subject<number>();
    private resizeObservable = this.resizeSubject.asObservable();
    @HostListener('window:resize', ['$event.target.innerWidth'])
    onResize(width: number) {
        this.resizeSubject.next(width);
    }
    constructor(private auth: AuthService) {
        this.resizeObservable.subscribe(() => this.handleIphoneX());
    }
    ngOnInit() {
        this.handleIphoneX();
        this.loggedIn = this.auth.isLoggedIn();
    }
    ngOnDestroy() {
        this.iphoneAttrs.map(i => document.documentElement.removeAttribute(i));
    }
    handleIphoneX() {
        if (onsPlatform.isIPhoneX()) {
            this.iphoneAttrs.map((i: string) =>
                document.documentElement.setAttribute(i, ''),
            );
        } else {
            this.iphoneAttrs.map(i => document.documentElement.removeAttribute(i));
        }
    }
}
