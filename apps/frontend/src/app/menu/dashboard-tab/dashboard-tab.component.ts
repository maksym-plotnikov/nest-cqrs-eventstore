import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ons-page',
    templateUrl: './dashboard-tab.component.html',
    styleUrls: ['./dashboard-tab.component.scss'],
})
export class DashboardTabComponent implements OnInit {
    public edit!: boolean;

    ngOnInit(): void {
        this.edit = false;
    }
}
