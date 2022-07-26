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
  isLoginFailed;
  errorMessage;
  roles: string[];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.getToken() ? true : false;
    this.isLoginFailed = false;
    this.errorMessage = '';
    this.roles = this.tokenStorage.getToken()
      ? this.tokenStorage.getUser().roles
      : [];

    this.form = this.formBuilder.group({
      usuario: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  login() {
    const { usuario, senha } = this.form.value;
    this.authService.login(usuario, senha).subscribe({
      next: (data: any) => {
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  redirectToHome() {
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }
}
