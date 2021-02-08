import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnsNavigator } from 'ngx-onsenui';
import { ReportDetailsDeepComponent } from '../report-details-deep/report-details-deep.component';
import {
    DashboardTabComponent,
    PartnerTabComponent,
    TouchpointsTabComponent,
} from 'src/app/menu';

@Component({
    selector: 'ons-page[initial-page]',
    templateUrl: './initial-page.component.html',
    styleUrls: ['./initial-page.component.scss'],
})
export class InitialPageComponent implements OnInit {
    tab1 = DashboardTabComponent;
    tab2 = PartnerTabComponent;
    tab3 = TouchpointsTabComponent;

    constructor(private navigator: OnsNavigator, private router: Router) {}

    ngOnInit() {
        const params = this.router.parseUrl(this.router.url).queryParams;
        const keys = Object.keys(params);
        if (params && keys.length !== 0 && keys.includes('report')) {
            this.openReport(this.navigator, ReportDetailsDeepComponent, {
                data: { report: params.report },
            });
        }
    }

    openReport(navigator: OnsNavigator, page: any, data: any) {
        setTimeout(
            (navigator: any, page: any, data: any) => {
                navigator.nativeElement.pushPage(page, data);
            },
            500,
            navigator,
            page,
            data,
        );
    }
}
