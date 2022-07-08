import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Specialty } from '../model/specialty';

@Component({
  selector: 'app-specialty-details',
  templateUrl: './specialty-details.component.html',
  styleUrls: ['./specialty-details.component.css']
})
export class SpecialtyDetailsComponent implements OnInit {
  specialty: Specialty;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.specialty = this.route.snapshot.data['specialty'];
  }

  onBackToList(): void {
    this.location.back();
  }
}
