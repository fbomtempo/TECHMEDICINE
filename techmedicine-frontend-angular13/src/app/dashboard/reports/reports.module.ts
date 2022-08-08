import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports-page/reports.component';
import { NgChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, ReportsRoutingModule, NgChartsModule, NgSelectModule]
})
export class ReportsModule {}
