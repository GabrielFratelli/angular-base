import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAccountService {
  private apiUrl = 'http://localhost:3030/account';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?email=${email}&password=${password}`);
  }
}
