import { HttpClient } from '@angular/common/http';
import { delay, Observable, take } from 'rxjs';

export class CrudService<T extends { id?: number }> {
  constructor(protected http: HttpClient, protected API_URL: string) {}

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL).pipe(take(1));
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  update(T: T): Observable<Object> {
    return this.http.put(`${this.API_URL}/${T.id}`, T).pipe(take(1));
  }

  create(T: T): Observable<Object> {
    return this.http.post(`${this.API_URL}`, T).pipe(take(1));
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
