import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  dropdownTitles: string[] = new Array(2);
  dropdownTitlesActive: boolean[] = new Array(2);
  user: any;

  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.defaultDropdownsValues();
    this.getUserLoggedIn();
  }

  defaultDropdownsValues(): void {
    this.dropdownTitles = this.defaultTitles();
    this.dropdownTitlesActive = this.defaultStates();
  }

  private defaultTitles(): string[] {
    return ['Cadastros', 'Consultas'];
  }

  private defaultStates(): boolean[] {
    return [false, false];
  }

  onRouterLinkActive(event: boolean, key: number, title?: string): void {
    switch (key) {
      case 0:
        if (event) {
          setTimeout(() => {
            this.dropdownTitlesActive[key] = event;
            this.dropdownTitles[key] = title;
          });
        } else {
          this.dropdownTitlesActive[key] = event;
          this.dropdownTitles[key] = this.defaultTitles()
            .slice(key, key + 1)
            .toString();
        }
        break;
      case 1:
        if (event) {
          setTimeout(() => {
            this.dropdownTitlesActive[key] = event;
            this.dropdownTitles[key] = title;
          });
        } else {
          this.dropdownTitlesActive[key] = event;
          this.dropdownTitles[key] = this.defaultTitles()
            .slice(key, key + 1)
            .toString();
        }
        break;
      default:
        if (event) {
          this.dropdownTitlesActive = this.defaultStates();
          this.dropdownTitles = this.defaultTitles();
        }
        break;
    }
  }

  private getUserLoggedIn(): void {
    this.user = this.tokenService.getUser();
  }

  isAdmin(): boolean {
    let admin: boolean = false;
    this.user['authorities'].forEach((authority: string) => {
      if (authority === 'ROLE_ADMIN') {
        admin = true;
      }
    });
    return admin;
  }

  isSecretario(): boolean {
    let secretario: boolean = true;
    this.user['authorities'].forEach((authority: string) => {
      if (authority === 'ROLE_SECRETARIO') {
        secretario = false;
      }
    });
    return secretario;
  }

  signOut(): void {
    this.tokenService.signOut();
    this.router.navigate(['/login']);
  }
}
