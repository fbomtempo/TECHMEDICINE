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
*/

