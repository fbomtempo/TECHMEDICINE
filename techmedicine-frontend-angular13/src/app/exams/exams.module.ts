import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../shared/shared.module';
import { ExamDetailsComponent } from './exam-details/exam-details.component';
import { ExamFormComponent } from './exam-form/exam-form.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamsRoutingModule } from './exams-routing.module';

@NgModule({
  declarations: [ExamListComponent, ExamDetailsComponent, ExamFormComponent],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class ExamsModule {}
