import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-cargos-detalhes',
  templateUrl: './cargos-detalhes.component.html',
  styleUrls: ['./cargos-detalhes.component.css']
})
export class CargosDetalhesComponent implements OnInit {

  cargo: Cargo;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.cargo = this.route.snapshot.data['cargo'];
  }

  onBackToList(): void {
    this.location.back();
  }

}
