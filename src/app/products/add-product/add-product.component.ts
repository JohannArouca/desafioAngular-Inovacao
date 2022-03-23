import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';
import { Product } from '../product';
import { ProductsService } from '../produts.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addForm: any = FormGroup;
  product$: Observable<Product>;
  product: Product;
  codigoBarras: string;
  base64Output: string;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.codigoBarras = this.route.snapshot.params?.['codigoBarras'];

    if (this.codigoBarras) {
      this.product$ = this.productsService.getProduct(this.codigoBarras);
      this.product$.subscribe(
        (res) => {
          this.product = res;

          this.base64Output = this.product.base64;

          this.addForm = this.formBuilder.group({
            base64: [''],
            codigoBarras: [this.product.codigoBarras],
            nome: [this.product.nome],
            preco: [this.product.preco],
          });
        },
        (err) => console.log(err)
      );
    } else {
      this.addForm = this.formBuilder.group({
        base64: [''],
        codigoBarras: [''],
        nome: [''],
        preco: [''],
      });
    }
  }

  async add() {
    const codigoBarras = this.addForm.get('codigoBarras').value;
    const nome = this.addForm.get('nome').value;
    const preco = this.addForm.get('preco').value;

    if (this.codigoBarras) {
      this.productsService
        .editProduct({
          codigoBarras,
          nome,
          preco,
          base64: this.base64Output,
        })
        .subscribe((res: any) => {
          if (res.sucesso) {
            this.router.navigate(['products']);
          } else {
            alert(res.inconsistencias[0]);
          }
        });
    } else {
      this.productsService
        .addProduct({
          codigoBarras,
          nome,
          preco,
          base64: this.base64Output,
        })
        .subscribe((res: any) => {
          if (res.sucesso) {
            this.router.navigate(['products']);
          } else {
            alert(res.inconsistencias[0]);
          }
        });
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    this.convertFile(files[0]).subscribe((base64) => {
      this.base64Output = 'data:image/jpeg;base64,' + base64;
    });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) =>
      result.next(btoa(event.target?.result as string));
    return result;
  }

  back() {
    this.router.navigate(['products']);
  }

  leave() {
    this.tokenService.removeToken();
    this.router.navigate(['']);
  }
}
