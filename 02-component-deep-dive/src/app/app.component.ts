import { Component } from '@angular/core';
import { DashboardItemComponent } from './dashboard/dashboard-item/dashboard-item.component';
import { ServerStatusComponent } from './dashboard/server-status/server-status.component';
import { SupportTicketsComponent } from './dashboard/support-tickets/support-tickets.component';
import { TrafficComponent } from './dashboard/traffic/traffic.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    DashboardItemComponent,
    ServerStatusComponent,
    SupportTicketsComponent,
    TrafficComponent,
  ],
})
export class AppComponent {}
