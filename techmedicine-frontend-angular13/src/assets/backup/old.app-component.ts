/*<nav class="navbar navbar-expand-lg navbar-dark bg-color-primary">
  <div class="container-fluid">
    <a class="navbar-brand" [routerLink]="['/home']">TECHMEDICINE</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a
            class="nav-link"
            aria-current="page"
            [routerLink]="['/home']"
            [routerLinkActive]="['active']"
            (isActiveChange)="onRouterLinkActiveHome($event)"
            >Home</a
          >
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            [class.active]="dropdownTitleActive"
          >
            {{ dropdownTitle }}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <a
                class="dropdown-item"
                [routerLink]="['pacientes']"
                [queryParams]="{ pagina: 1 }"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{
                  paths: 'subset',
                  queryParams: 'ignored',
                  matrixParams: 'ignored',
                  fragment: 'ignored'
                }"
                (isActiveChange)="onRouterLinkActive($event, 'Pacientes')"
                >Cadastro de Pacientes</a
              >
            </li>
            <li></li>
            <li>
              <a
                class="dropdown-item"
                [routerLink]="['medicos']"
                [queryParams]="{ pagina: 1 }"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{
                  paths: 'subset',
                  queryParams: 'ignored',
                  matrixParams: 'ignored',
                  fragment: 'ignored'
                }"
                (isActiveChange)="onRouterLinkActive($event, 'Médicos')"
                >Cadastro de Médicos</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                [routerLink]="['funcionarios']"
                [queryParams]="{ pagina: 1 }"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{
                  paths: 'subset',
                  queryParams: 'ignored',
                  matrixParams: 'ignored',
                  fragment: 'ignored'
                }"
                (isActiveChange)="onRouterLinkActive($event, 'Funcionários')"
                >Cadastro de Funcionários</a
              >
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a
                class="dropdown-item"
                [routerLink]="['especialidades']"
                [queryParams]="{ pagina: 1 }"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{
                  paths: 'subset',
                  queryParams: 'ignored',
                  matrixParams: 'ignored',
                  fragment: 'ignored'
                }"
                (isActiveChange)="onRouterLinkActive($event, 'Especialidades')"
                >Cadastro de Especialidades</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                [routerLink]="['cargos']"
                [queryParams]="{ pagina: 1 }"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{
                  paths: 'subset',
                  queryParams: 'ignored',
                  matrixParams: 'ignored',
                  fragment: 'ignored'
                }"
                (isActiveChange)="onRouterLinkActive($event, 'Cargos')"
                >Cadastro de Cargos</a
              >
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            [class.active]="dropdownTitleActive2"
          >
            {{ dropdownTitle2 }}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <a
                class="dropdown-item"
                [routerLink]="['agendamentos']"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{
                  paths: 'subset',
                  queryParams: 'ignored',
                  matrixParams: 'ignored',
                  fragment: 'ignored'
                }"
                (isActiveChange)="onRouterLinkActive2($event, 'Agendamentos')"
                >Realizar Agendamento</a
              >
            </li>
            <li></li>
            <li><a class="dropdown-item"></a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <div class="d-flex me-1 mt-0 mb-0">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown dropstart">
            <a
              class="nav-link"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="far fa-user-circle text-white fs-2"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a type="button" class="dropdown-item" (click)="logout()"
                  >Logout</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

title = 'techmedicine';
  dropdownTitle: string;
  dropdownTitle2: string;
  dropdownTitleActive: boolean;
  dropdownTitleActive2: boolean;
  isLoggedIn: boolean = false;

  constructor(private tokenStorageService: TokenStorageService) {}

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
      this.dropdownTitle2 = 'Consultas';
      this.dropdownTitleActive = event;
      this.dropdownTitleActive2 = false;
    }
  }

  onRouterLinkActive2(event: boolean, dropdownTitle: string) {
    if (event === true) {
      this.dropdownTitle2 = dropdownTitle;
      this.dropdownTitle = 'Cadastros';
      this.dropdownTitleActive2 = event;
      this.dropdownTitleActive = false;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

[------------------------------------------------------------------]

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
