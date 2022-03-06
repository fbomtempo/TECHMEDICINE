import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medico } from '../medico';

@Component({
  selector: 'app-medicos-detalhes',
  templateUrl: './medicos-detalhes.component.html',
  styleUrls: ['./medicos-detalhes.component.css']
})
export class MedicosDetalhesComponent implements OnInit {

  medico: Medico;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.medico = this.route.snapshot.data['medico'];
  }

  onBackToList(): void {
    this.location.back();
  }
}
