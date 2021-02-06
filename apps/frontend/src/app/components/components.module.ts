import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCardComponent } from './report-card/report-card.component';
import { OnsenModule } from 'ngx-onsenui';

const Components = [ReportCardComponent];

@NgModule({
    declarations: [...Components],
    imports: [CommonModule, OnsenModule],
    exports: [...Components],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
