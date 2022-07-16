import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { LookupModalComponent } from './lookup-modal/lookup-modal.component';
import { PaginationPipe } from './pipes/pagination.pipe';

@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent,
    PaginationPipe,
    LookupModalComponent
  ],
  imports: [CommonModule],
  exports: [PaginationPipe]
})
export class SharedModule {}
