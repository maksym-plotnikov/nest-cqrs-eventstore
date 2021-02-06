import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OnsenModule } from 'ngx-onsenui';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { DashboardTabComponent } from './menu/dashboard-tab/dashboard-tab.component';
import { PartnerTabComponent } from './menu/partner-tab/partner-tab.component';
import { TouchpointsTabComponent } from './menu/touchpoints-tab/touchpoints-tab.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
    declarations: [
        AppComponent,
        DashboardTabComponent,
        PartnerTabComponent,
        TouchpointsTabComponent,
    ],
    imports: [
        BrowserModule,
        OnsenModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        HttpClientModule,
        ComponentsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [],
    entryComponents: [
        DashboardTabComponent,
        PartnerTabComponent,
        TouchpointsTabComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
