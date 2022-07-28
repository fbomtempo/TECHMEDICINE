import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud-service';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}usuarios`);
  }
}
