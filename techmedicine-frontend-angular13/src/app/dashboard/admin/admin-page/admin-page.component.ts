import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  c1: string = 'list';
  c2: string = 'form';
  components: any = {
    [this.c1]: {
      active: true
    },
    [this.c2]: {
      active: false
    }
  };
  user: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  changeComponent(activateComponent: string): void {
    for (const component in this.components) {
      if (component !== activateComponent) {
        this.components[component].active = false;
      }
    }
    this.components[activateComponent].active = true;
  }

  findUser(id: number): void {
    this.userService.findById(id).subscribe({
      next: (response) => {
        this.user = response;
        this.changeComponent(this.c2);
      }
    });
  }

  clearUser(): void {
    this.user = undefined;
  }

  onHome(): void {
    this.router.navigate(['/home']);
  }
}
