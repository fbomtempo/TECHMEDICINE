import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Role } from '../model/role';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RolesDetailsComponent implements OnInit {
  role: Role;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.role = this.route.snapshot.data['role'];
  }
}
