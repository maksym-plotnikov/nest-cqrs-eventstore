import { Component } from '@angular/core';
import { InitialPageComponent } from '../pages/initial-page/initial-page.component';

@Component({
    selector: 'smplct-view-mobile',
    templateUrl: './mobile.component.html',
})
export class MobileComponent {
    initialPage = InitialPageComponent;
}
