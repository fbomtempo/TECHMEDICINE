import { Location } from '@angular/common';
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

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.role = this.route.snapshot.data['role'];
  }

  onBackToList(): void {
    this.location.back();
  }
}
