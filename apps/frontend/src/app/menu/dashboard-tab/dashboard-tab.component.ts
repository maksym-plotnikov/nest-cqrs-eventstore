import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { ReportDetailsComponent } from '../../pages/report-details/report-details.component';

@Component({
    selector: 'ons-page[dashboard]',
    templateUrl: './dashboard-tab.component.html',
    styleUrls: ['./dashboard-tab.component.scss'],
})
export class DashboardTabComponent implements OnInit {
    public edit!: boolean;

    constructor(private navigator: OnsNavigator) {}

    ngOnInit(): void {
        this.edit = false;
    }

    pushDetailsPage() {
        this.navigator.nativeElement.pushPage(ReportDetailsComponent);
    }
}
