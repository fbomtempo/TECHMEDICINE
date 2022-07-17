import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { ExamDetailsComponent } from './exam-details/exam-details.component';
import { ExamFormComponent } from './exam-form/exam-form.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamsResolver } from './guards/exams.resolver';

const routes: Routes = [
  {
    path: '',
    component: ExamListComponent
  },
  {
    path: 'novo',
    component: ExamFormComponent,
    resolve: { exam: ExamsResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: ExamFormComponent,
    resolve: { exam: ExamsResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: ExamDetailsComponent,
    resolve: { exam: ExamsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule {}
