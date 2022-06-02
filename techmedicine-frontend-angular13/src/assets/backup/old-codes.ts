/*
------------ PACIENTES LISTA ------------

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

/*this.estados$ = this.http.get<Estado>('assets/dados/estados.json').pipe(take(1));
this.subscription = this.estados$.subscribe(estados => {
  this.estados = estados;
  this.estados.forEach(estado => {
    if (this.paciente.estado === estado.uf) {
      this.paciente.estado = estado.descricao;
    }
  })
});


------------ PACIENTES LISTA HTML ------------

<!--
<ng-template #loading2>
  <div style="height: 85vh" class="d-flex align-items-center justify-content-center">
    <div class="spinner-border" style="width: 8rem; height: 8rem; color: grey" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</ng-template>
-->

------------ MEDICOS FORM HTML ------------

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

------------ AGENDAMENTOS FORM HTML ------------

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
*/
