import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Disease } from '../model/disease';

@Component({
  selector: 'app-disease-details',
  templateUrl: './disease-details.component.html',
  styleUrls: ['./disease-details.component.css']
})
export class DiseaseDetailsComponent implements OnInit {
  disease: Disease;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.disease = this.route.snapshot.data['disease'];
  }
}
