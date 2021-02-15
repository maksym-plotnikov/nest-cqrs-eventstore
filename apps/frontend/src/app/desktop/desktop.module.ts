import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopComponent } from './desktop.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [DesktopComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: DesktopComponent }]),
    ],
})
export class DesktopModule {}
