import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { TokenStorageService } from '../../auth/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn;
  isLoginFailed: boolean = false;
  errorMessage: string = 'Usuário ou senha inválido(s)';
  roles: string[];

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoginFailed = false;
    this.isLoggedInFn();
    this.createForm();
  }

  private isLoggedInFn(): void {
    this.isLoggedIn =
      this.tokenService.getToken() && !this.tokenService.isExpired()
        ? true
        : false;
    if (!this.isLoggedIn) {
      this.tokenService.signOut();
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      usuario: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  login() {
    const { usuario, senha } = this.form.value;
    this.authService.login(usuario, senha).subscribe({
      next: (data: any) => {
        this.tokenService.saveToken(data.access_token);
        console.log(this.tokenService.getUser());
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        if (err.status) {
          this.isLoginFailed = true;
          alert(this.errorMessage);
        }
      }
    });
  }
}

/*ngOnInit(): void {
    this.isLoggedIn = this.tokenService.getToken() ? true : false;
    this.isExpired();
    this.isLoginFailed = false;
    this.errorMessage = '';
    this.roles = this.tokenService.getToken()
      ? this.tokenService.getUser().roles
      : [];

    this.form = this.formBuilder.group({
      usuario: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  isExpired() {
    if (this.tokenService.isExpired()) {
      this.tokenService.signOut();
    }
  }

  login() {
    const { usuario, senha } = this.form.value;
    this.authService.login(usuario, senha).subscribe({
      next: (data: any) => {
        this.tokenService.saveToken(data.access_token);
        this.tokenService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenService.getUser().roles;
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  redirectToHome() {
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }*/
