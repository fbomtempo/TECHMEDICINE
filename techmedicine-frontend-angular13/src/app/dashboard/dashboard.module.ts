import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './menus/footer/footer.component';
import { NavbarComponent } from './menus/navbar/navbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, FooterComponent],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
