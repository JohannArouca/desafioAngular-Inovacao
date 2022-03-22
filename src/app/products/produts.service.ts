import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../core/token/token.service';
import { Product } from './product';

const API_URL = 'https://johann.reader.homologacao.inovamobil.com.br/';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  addProduct(body: object) {
    let headers = new HttpHeaders()
      .append('accept', 'application/json')
      .append('Content-Type', 'application/json-patch+json')
      .append('Authorization', 'Bearer ' + this.tokenService.getToken());

    return this.http.post(API_URL + 'api/produtos', body, {
      headers: headers,
    });
  }

  getProducts() {
    let headers = new HttpHeaders()
      .append('accept', 'application/json')
      .append('Authorization', 'Bearer ' + this.tokenService.getToken());

    return this.http.get<Product[]>(API_URL + 'api/produtos', {
      headers: headers,
    });
  }

  getProduct(codigoBarras: string) {
    let headers = new HttpHeaders()
      .append('accept', 'application/json')
      .append('Authorization', 'Bearer ' + this.tokenService.getToken());

    return this.http.get<Product>(API_URL + 'api/produtos/' + codigoBarras, {
      headers: headers,
    });
  }

  editProduct(body: object) {
    let headers = new HttpHeaders()
      .append('accept', 'application/json')
      .append('Content-Type', 'application/json-patch+json')
      .append('Authorization', 'Bearer ' + this.tokenService.getToken());

    return this.http.put(API_URL + 'api/produtos', body, {
      headers: headers,
    });
  }

  deleteProduct(codigoBarras: string) {
    let headers = new HttpHeaders()
      .append('accept', 'application/json')
      .append('Authorization', 'Bearer ' + this.tokenService.getToken());

    return this.http.delete(API_URL + 'api/produtos/' + codigoBarras, {
      headers: headers,
    });
  }
}
