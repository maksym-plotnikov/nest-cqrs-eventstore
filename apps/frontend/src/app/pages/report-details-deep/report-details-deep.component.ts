import { Component, OnInit } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';

@Component({
    selector: 'ons-page[deep]',
    templateUrl: './report-details-deep.component.html',
    styleUrls: ['./report-details-deep.component.scss'],
})
export class ReportDetailsDeepComponent implements OnInit {
    report!: string;
    constructor(private navigator: OnsNavigator, private params: Params) {}

    ngOnInit() {
        if (this.params?.data?.report) {
            const { report } = this.params?.data;
            this.report = report;
        }
    }
}
