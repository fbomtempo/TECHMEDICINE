import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Especialidade } from '../especialidade';

@Component({
  selector: 'app-especialidades-detalhes',
  templateUrl: './especialidades-detalhes.component.html',
  styleUrls: ['./especialidades-detalhes.component.css']
})
export class EspecialidadesDetalhesComponent implements OnInit {

  especialidade: Especialidade;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.especialidade = this.route.snapshot.data['especialidade'];
  }

  onBackToList(): void {
    this.location.back();
  }

  /*unsorted(a: any, b: any): number {
    return 0;
  }*/
}
