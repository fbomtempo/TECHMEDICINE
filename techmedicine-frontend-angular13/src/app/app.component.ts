import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { TokenStorageService } from './auth/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'techmedicine';
  dropdownTitles: string[] = new Array(2);
  dropdownTitlesActive: boolean[] = new Array(2);
  isLoggedIn: boolean = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private localeService: BsLocaleService
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.localeService.use('pt-br');
    this.defaultDropdownsValues();
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

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
