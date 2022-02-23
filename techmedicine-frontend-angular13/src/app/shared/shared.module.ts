import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { PaginationPipe } from './pipes/pagination.pipe';

@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent,
    PaginationPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationPipe
  ]
})
export class SharedModule { }
