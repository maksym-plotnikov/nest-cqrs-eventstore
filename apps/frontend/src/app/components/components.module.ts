import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnsenModule } from 'ngx-onsenui';
import { ReportCardComponent } from './report-card/report-card.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { KeysPipe } from '../shared/keys.pipe';

const Components = [ReportCardComponent, FormFieldComponent];

@NgModule({
    declarations: [...Components, KeysPipe],
    imports: [CommonModule, OnsenModule, FormsModule, ReactiveFormsModule],
    exports: [...Components],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
