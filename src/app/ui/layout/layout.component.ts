import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { injectAppConfig } from 'src/app/shared/config/config.di';

import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { TopNavComponent } from '../top-nav/top-nav.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <mat-sidenav-container class="layout-container">
      <mat-sidenav mode="side" opened>
        <app-side-nav></app-side-nav>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-top-nav></app-top-nav>
        <div class="layout-content-containers">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./layout.component.scss'],
  imports: [MatSidenavModule, SideNavComponent, TopNavComponent, RouterOutlet]
})
export default class LayoutComponent {

  readonly appConfig = injectAppConfig();

}
