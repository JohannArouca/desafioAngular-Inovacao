import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  hasToken() {
    return !!this.getToken();
  }

  setToken(token: string) {
    window.localStorage.setItem('token', token);
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

  removeToken() {
    window.localStorage.removeItem('token');
  }
}
