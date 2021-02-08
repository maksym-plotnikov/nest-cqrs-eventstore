import { Component } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { ReportDetailsDeepComponent } from '../report-details-deep/report-details-deep.component';

@Component({
    selector: 'ons-page[report]',
    templateUrl: './report-details.component.html',
    styleUrls: ['./report-details.component.scss'],
})
export class ReportDetailsComponent {
    constructor(private navigator: OnsNavigator, private params: Params) {}

    push() {
        this.navigator.nativeElement.pushPage(ReportDetailsDeepComponent, {
            data: { report: '234554' },
        });
    }
}
