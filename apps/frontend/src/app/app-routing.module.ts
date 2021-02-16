import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './mobile/mobile.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    {
        path: 'mobile',
        component: MobileComponent,
    },
    {
        path: 'desktop',
        loadChildren: async () =>
            (await import('./desktop/desktop.module')).DesktopModule,
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
