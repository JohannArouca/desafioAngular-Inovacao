import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TokenService } from '../core/token/token.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { Product } from './product';
import { ProductsService } from './produts.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  element_data: Product[] = [];
  displayedColumns: string[] = [
    'codigoBarras',
    'nome',
    'preco',
    'base64',
    'acoes',
  ];
  dataSource = new MatTableDataSource(this.element_data);

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadTable() {
    this.productsService.getProducts().subscribe((res) => {
      while (this.element_data.length) {
        this.element_data.pop();
      }

      res.forEach((product: Product) => {
        this.element_data.push({
          codigoBarras: product.codigoBarras,
          nome: product.nome,
          preco: product.preco,
          base64: product.base64,
        });

        this.dataSource = new MatTableDataSource(this.element_data);
      });
    });
  }

  addProduct() {
    this.router.navigate(['add']);
  }

  editProduct(codigoBarras: string) {
    this.router.navigate(['add', codigoBarras]);
  }

  viewProduct(codigoBarras: string) {
    this.router.navigate(['product', codigoBarras]);
  }

  deleteProduct(codigoBarras: string) {
    this.openDeleteDialog(codigoBarras);
  }

  openDeleteDialog(codigoBarras: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productsService.deleteProduct(codigoBarras).subscribe((res) => {
          this.loadTable();
        });
      }
    });
  }

  leave() {
    this.tokenService.removeToken();
    this.router.navigate(['']);
  }
}
