import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';

@Component({
    selector: 'smplct-view-report-card',
    templateUrl: './report-card.component.html',
    styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent implements OnInit, AfterViewInit, OnDestroy {
    edit!: boolean;

    @ViewChild('card') card!: ElementRef;

    ngOnInit(): void {
        this.edit = false;
    }

    editOn() {
        this.edit = true;
    }
    editOff() {
        this.edit = false;
    }

    ngAfterViewInit() {
        this.card.nativeElement.addEventListener('dragleft', this.editOn.bind(this));
        this.card.nativeElement.addEventListener('dragright', this.editOff.bind(this));
    }

    ngOnDestroy() {
        this.card.nativeElement.removeEventListener('dragleft', this.editOn.bind(this));
        this.card.nativeElement.removeEventListener('dragright', this.editOff.bind(this));
    }
}
