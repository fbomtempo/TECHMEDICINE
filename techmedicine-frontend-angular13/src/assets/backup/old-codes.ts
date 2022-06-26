/*
------------ PACIENTES LISTA ------------

>>> HTML <<<
<!--
<ng-template #loading2>
  <div style="height: 85vh" class="d-flex align-items-center justify-content-center">
    <div class="spinner-border" style="width: 8rem; height: 8rem; color: grey" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</ng-template>
-->

>>> TS <<<
/*onRefresh(): void | Observable<never> {
  this.pacientes$ = this.pacientesService.findAll()
    .pipe(
      map(pacientes => {
        pacientes.forEach(paciente => {
          this.formatData(paciente);
        });
        return pacientes;
      }),
      catchError(() => {
        this.error.next(true);
        return of();
      })
  );
}

------------ PACIENTES DETALHES ------------

>>> TS <<<
/*this.estados$ = this.http.get<Estado>('assets/dados/estados.json').pipe(take(1));
this.subscription = this.estados$.subscribe(estados => {
  this.estados = estados;
  this.estados.forEach(estado => {
    if (this.paciente.estado === estado.uf) {
      this.paciente.estado = estado.descricao;
    }
  })
});

------------ MEDICOS FORM ------------

>>> HTML <<<
<!--<label for="especialidade" class="form-label">Especialidade</label>
      <ng-autocomplete
        #especialidadeAutocomplete
        [data]="especialidades$ | async"
        [searchKeyword]="keyword"
        notFoundText="Não encontrado"
        placeholder="Especialidade"
        [initialValue]="initialValue"
        (closed)='onClosed($event)'
        (selected)="selectEvent($event)"
        [itemTemplate]="itemTemplate"
        [notFoundTemplate]="notFoundTemplate"
        name="especialidade">
      </ng-autocomplete>
    </div>
    <ng-template #itemTemplate let-item>
      <a [innerHTML]="item.descricao"></a>
    </ng-template>
    <ng-template #notFoundTemplate let-notFound>
      <div [innerHTML]="notFound"></div>
    </ng-template>-->

------------ AGENDAMENTOS FORM ------------

>>> HTML <<<
<!--<ng-template #customItemTemplate let-model="item">
  <span>{{ model.nome + ' ' + model.sobrenome + '    CPF:' + model.cpf }}</span>
</ng-template>

<label for="states">States</label>
<input [(ngModel)]="selected"
       [typeahead]="patients"
       [typeaheadOptionsLimit]="15"
       (typeaheadOnSelect)="select($event.item)"
       class="form-control"
       id="states">
<button (click)="print()">Print</button>
<pre class="card card-block card-header mb-3">Model: {{selected | json}}</pre>

  <label for="patients">Pacientes</label>
  <input formControlName="patient"
       [typeahead]="patients"
       typeaheadOptionField="nome"
       [typeaheadOptionsLimit]="15"
       (typeaheadOnSelect)="select($event.item)"
       class="form-control"
       id="patients">
  <button (click)="print()">Print</button>-->

  <select class="form-select" id="patient" formControlName="patient" placeholder="Paciente"
  [ngClass]="applyValidationClass('patient')" [compareWith]="compareFnPatient">
    <option value="null" disabled="true" [selected]="true">Selecione o paciente</option>
    <option *ngFor="let patient of patients$ | async" [ngValue]="patient">{{ patient.name + ' ' + patient.surname }}</option>t
  </select>-->

------------ AGENDAMENTOS CALENDAR ------------

  >>> HTML <<<
  <!--<div class="row">
      <div class="pt-4 pb-md-0 pb-3 col-3">
        <a class="fs-5 display-1 back" (click)="onBack()"><i class="fas fa-arrow-left"></i><span
            class="ms-2">Voltar</span></a>
      </div>
      <div class="pt-4 pb-md-0 pb-3 col-9 text-end" role="group" aria-label="Basic example">
        <label class="btn btn-primary" [(ngModel)]="radioModel"
          btnRadio="Calendar" tabindex="0" role="button">Calendário</label>
        <label class="btn btn-primary" [(ngModel)]="radioModel" (click)="changeUrl()"
          btnRadio="List" tabindex="0" role="button">Lista</label>
      </div>-->

  <!-- <div *ngIf="radioModel === 'Calendar'; else appointmentsList"> -->


  <!-- <ng-template #appointmentsList>
    <app-appointment-list [appointments]="appointments" [error]="error" (deleteEvent)="onRefresh()" *ngIf="radioModel === 'List'" ></app-appointment-list>
  </ng-template> -->

  >>> TS <<<
  /* radioModel: string = 'Calendar';

  /*

onInit() {
  if (this.route.snapshot.queryParams['pagina']) {
    this.radioModel = 'List';
  }
  this.radioModel = 'Calendar';
}

changeUrl(): void {
    this.router.navigate([], {
      queryParams: {
        pagina: 1
      }
    });
  }

------------ FORM SERVICE ------------

  /*private formHasChanged(): boolean {
    let cont: number = 0;
    Object.keys(this.form.value).forEach(key => {
      if (this.form.value[key] != '' && this.form.value[key] != null && this.form.value[key] != undefined) {
        cont++;
      }
    });
    if (cont != 0 && this.changed && !this.submittedSucess) {
      return confirm('Tem certeza que deseja sair? Os dados preenchidos serão perdidos.');
    }
    return true;
  }


------------ APP COMPONENT ------------

<!--
<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Cursos
  </a>
  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
    <li><a class="dropdown-item" [routerLink]="['cursos']" [routerLinkActive]="['active']">Listar Cursos</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</li>
-->

*/


