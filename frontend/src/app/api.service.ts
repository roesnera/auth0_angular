import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../auth_config.json';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  pingProtected$() {
    return this.http.get(`${config.apiUri}/api/protected`);
  }

  pingPrivate$() {
    return this.http.get(`${config.apiUri}/api/private`);
  }

  pingPublic$() {
    return this.http.get(`${config.apiUri}/api/public`);
  }
}
