import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Drug } from '../model/drug';

@Component({
  selector: 'app-drug-details',
  templateUrl: './drug-details.component.html',
  styleUrls: ['./drug-details.component.css']
})
export class DrugDetailsComponent implements OnInit {
  drug: Drug;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.drug = this.route.snapshot.data['drug'];
  }
}
