import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form-service';

import { AuthService } from '../../auth/services/auth.service';
import { TokenStorageService } from '../../auth/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormService implements OnInit {
  readonly errorMessage: string = 'Usuário ou senha inválido(s)';
  loggedIn: boolean = false;
  roles: string[];

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(20)]],
      password: [null, Validators.required]
    });
  }

  login() {
    this.submitted = true;
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe({
        next: (data: any) => {
          this.tokenService.saveToken(data.access_token);
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          if (err.status) {
            alert(this.errorMessage);
          }
        }
      });
    }
  }
}
