import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpErrorsRoutingModule } from './http-errors-routing.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    UnauthorizedComponent
  ],
  imports: [CommonModule, HttpErrorsRoutingModule]
})
export class HttpErrorsModule {}
