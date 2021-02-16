import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OnsenModule } from 'ngx-onsenui';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ComponentsModule } from './components/components.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { DesktopModule } from './desktop/desktop.module';
import { MobileModule } from './mobile/mobile.module';

@NgModule({
    declarations: [AppComponent, LoginPageComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        OnsenModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        HttpClientModule,
        ComponentsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        DesktopModule,
        MobileModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
