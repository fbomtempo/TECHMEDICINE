import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'techmedicine';
  dropdownTitle: string;
  dropdownTitle2: string;
  dropdownTitleActive: boolean;
  dropdownTitleActive2: boolean;
  isLoggedIn: boolean = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.dropdownTitle = 'Cadastros';
    this.dropdownTitle2 = 'Consultas';
    this.dropdownTitleActive = false;
    this.dropdownTitleActive2 = false;
  }

  onRouterLinkActiveHome(event: boolean) {
    if (event === true) {
      this.dropdownTitle = 'Cadastros';
      this.dropdownTitle2 = 'Consultas';
      this.dropdownTitleActive = false;
      this.dropdownTitleActive2 = false;
    }
  }

  onRouterLinkActive(event: boolean, dropdownTitle: string) {
    if (event === true) {
      this.dropdownTitle = dropdownTitle;
      this.dropdownTitleActive = event;
    }
  }

  onRouterLinkActive2(event: boolean, dropdownTitle: string) {
    if (event === true) {
      this.dropdownTitle2 = dropdownTitle;
      this.dropdownTitleActive2 = event;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}













  /*
  (isActiveChange)="onRouterLinkActiveHome($event)"

  setDropdownActive() {
    const queryParamsIndex = this.currentRoute.indexOf('?');
    const baseUrl = (queryParamsIndex === -1) ? this.currentRoute : this.currentRoute.slice(0, queryParamsIndex);
    if (this.currentRoute.includes(baseUrl) && this.currentRoute != '/home') {
      this.dropdownTitleActive = true;
      this.setDropdownTitle(this.dropdownTitleActive, baseUrl);
    } else {
      this.dropdownTitleActive = false;
      this.setDropdownTitle(this.dropdownTitleActive);
    }
  }

  private setDropdownTitle(isActive: boolean, baseUrl?: string) {
    if (isActive) {
      const endIndex = (baseUrl.substring(1).indexOf('/') === -1) ? undefined : baseUrl.substring(1).indexOf('/');
      const capitalizeFirstLetter = baseUrl.charAt(1).toUpperCase();
      this.dropdownTitle = (endIndex === undefined) ? capitalizeFirstLetter + baseUrl.slice(2, endIndex) : capitalizeFirstLetter + baseUrl.slice(2, endIndex + 1);
    } else {
      this.dropdownTitle = 'Cadastros';
    }
  }

  setDropdownItemActive(item: string) {
    return (this.dropdownTitleActive && this.dropdownTitle === item);
  }

  isLinkActive(url: string, dropdownTitle: string): boolean {
    console.log(url)
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl = queryParamsIndex === -1 ? this.router.url : this.router.url.slice(0, queryParamsIndex);
    if (baseUrl === url) {
      this.dropdownTitle = dropdownTitle;
      this.dropdownTitleActive = true;
    }
    return baseUrl === url;
  }
  */
