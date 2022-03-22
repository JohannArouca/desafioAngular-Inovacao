import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://johann.reader.homologacao.inovamobil.com.br/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(user: string, password: string) {
    return this.http.post(
      API_URL + 'api/login',
      {
        id: user,
        chaveAcesso: password,
      },
      {
        observe: 'response',
      }
    );
  }
}
