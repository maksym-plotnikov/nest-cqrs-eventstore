import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'smplct-view-report-card',
    templateUrl: './report-card.component.html',
    styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent implements OnInit {
    edit!: boolean;

    ngOnInit(): void {
        this.edit = false;
    }
}
