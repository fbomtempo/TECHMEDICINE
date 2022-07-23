import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Icd } from '../model/icd';

@Component({
  selector: 'app-icd-details',
  templateUrl: './icd-details.component.html',
  styleUrls: ['./icd-details.component.css']
})
export class IcdDetailsComponent implements OnInit {
  icd: Icd;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.icd = this.route.snapshot.data['icd'];
  }
}
