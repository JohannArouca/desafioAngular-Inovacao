import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';
import { Product } from '../product';
import { ProductsService } from '../produts.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  product$: Observable<Product>;
  codigoBarras: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.codigoBarras = this.route.snapshot.params?.['codigoBarras'];
    this.product$ = this.productService.getProduct(this.codigoBarras);
    this.product$.subscribe(
      () => {},
      (err) => console.log(err)
    );
  }

  back() {
    this.router.navigate(['products']);
  }

  leave() {
    this.tokenService.removeToken();
    this.router.navigate(['']);
  }
}
