import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { Estado } from 'src/app/shared/models/estado';
import { Paciente } from '../paciente';

@Component({
  selector: 'app-pacientes-detalhes',
  templateUrl: './pacientes-detalhes.component.html',
  styleUrls: ['./pacientes-detalhes.component.css']
})
export class PacientesDetalhesComponent implements OnInit, OnDestroy {

  paciente: Paciente;
  estados$: Observable<Estado>;
  subscription: Subscription;
  estados: any = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.paciente = this.route.snapshot.data['paciente'];
    this.estados$ = this.http.get<Estado>('assets/dados/estados.json').pipe(take(1));
    this.subscription = this.estados$.subscribe(estados => {
      this.estados = estados;
      this.estados.forEach(estado => {
        if (this.paciente.estado === estado.uf) {
          this.paciente.estado = estado.descricao;
        }
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onBackToList(): void {
    this.location.back();
  }

}
