import { Location } from "@angular/common";
import { FormBuilder, FormGroup, ValidationErrors } from "@angular/forms";
import { Router } from "@angular/router";
import { ICanDeactivate } from "../guards/ican-deactivate";

export class FormSerivce implements ICanDeactivate {

  form: FormGroup;
  submitted: boolean = false;
  changed: boolean = false;
  formType: string;

  constructor(
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected location: Location
  ) { }

  hasError(field: string): ValidationErrors {
    return this.form.get(field)?.errors;
  }

  isTouched(field: string): boolean {
    return this.form.get(field)?.touched;
  }

  isDirty(field: string): boolean {
    return this.form.get(field)?.dirty;
  }

  applyValidationClass(field: string): any {
    return {
      'is-invalid': (this.submitted || this.isTouched(field) || this.isDirty(field)) && this.hasError(field),
      'is-valid': (this.submitted || this.isTouched(field) || this.isDirty(field)) && !this.hasError(field)
    }
  }

  formHasChanged(): boolean {
    let cont: number = 0;
    Object.keys(this.form.value).forEach(key => {
      if (this.form.value[key] != '' && this.form.value[key] != null && this.form.value[key] != undefined) {
        cont++;
      }
    });

    if (cont != 0 && this.changed && !this.submitted) {
      return confirm('Tem certeza que deseja sair? Os dados preenchidos serão perdidos.');
    }
    return true;
  }

  canDeactivateRoute(): boolean {
    return this.formHasChanged();
  }

}
