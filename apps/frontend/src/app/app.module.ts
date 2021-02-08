import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OnsenModule } from 'ngx-onsenui';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { DashboardTabComponent } from './menu/dashboard-tab/dashboard-tab.component';
import { PartnerTabComponent } from './menu/partner-tab/partner-tab.component';
import { TouchpointsTabComponent } from './menu/touchpoints-tab/touchpoints-tab.component';
import { ComponentsModule } from './components/components.module';
import { Pages } from './pages';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        DashboardTabComponent,
        PartnerTabComponent,
        TouchpointsTabComponent,
        ...Pages,
        InitialPageComponent,
        LoginPageComponent,
    ],
    imports: [
        BrowserModule,
        OnsenModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        HttpClientModule,
        ComponentsModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [AuthService],
    entryComponents: [
        DashboardTabComponent,
        PartnerTabComponent,
        TouchpointsTabComponent,
        ...Pages,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
