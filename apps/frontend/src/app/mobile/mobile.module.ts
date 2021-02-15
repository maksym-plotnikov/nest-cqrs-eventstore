import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pages } from '../pages';
import {
    DashboardTabComponent,
    PartnerTabComponent,
    TouchpointsTabComponent,
} from '../menu';
import { MobileComponent } from './mobile.component';
import { ComponentsModule } from '../components/components.module';
import { OnsenModule } from 'ngx-onsenui';

const routes: Routes = [{ path: '', component: MobileComponent }];

@NgModule({
    declarations: [
        ...Pages,
        DashboardTabComponent,
        PartnerTabComponent,
        TouchpointsTabComponent,
        MobileComponent,
    ],
    imports: [OnsenModule, CommonModule, ComponentsModule, RouterModule.forChild(routes)],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        ...Pages,
        DashboardTabComponent,
        PartnerTabComponent,
        TouchpointsTabComponent,
    ],
})
export class MobileModule {}
