import { Location } from '@angular/common';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ICanDeactivate } from '../guards/ican-deactivate';

export class FormService implements ICanDeactivate {
  form: FormGroup;
  formType: string;
  changed: boolean = false;
  submitted: boolean = false;
  submittedSucess: boolean = false;

  constructor() {}

  applyValidationClass(field: string, ngSelect?: boolean): any {
    if (ngSelect) {
      return {
        'ng-untouched': !this.submitted,
        'ng-touched': this.submitted
      };
    }
    return {
      'is-invalid':
        (this.submitted || this.isTouched(field) || this.isDirty(field)) &&
        this.hasError(field),
      'is-valid':
        (this.submitted || this.isTouched(field) || this.isDirty(field)) &&
        !this.hasError(field)
    };
  }

  private hasError(field: string): ValidationErrors {
    return this.form.get(field)?.errors;
  }

  private isTouched(field: string): boolean {
    return this.form.get(field)?.touched;
  }

  private isDirty(field: string): boolean {
    return this.form.get(field)?.dirty;
  }

  subscribeToChanges(): void {
    this.form.valueChanges.pipe(take(1)).subscribe(() => {
      this.changed = true;
    });
  }

  canDeactivateRoute(): boolean {
    if (this.changed && !this.submittedSucess) {
      const deactivate: boolean = confirm(
        'Tem certeza que deseja sair? Os dados preenchidos serão perdidos.'
      );
      if (deactivate) {
        this.changed = false;
      }
      return deactivate;
    }
    return true;
  }
}
