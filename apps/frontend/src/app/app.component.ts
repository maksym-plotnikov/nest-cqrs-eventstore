import { Component } from '@angular/core';
import {
  DashboardTabComponent,
  PartnerTabComponent,
  TouchpointsTabComponent
 } from './menu';

@Component({
    selector: 'smplct-view-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
  tab1 = DashboardTabComponent;
  tab2 = PartnerTabComponent;
  tab3 = TouchpointsTabComponent;
}
