import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProductsComponent } from './products/products.component';
import { ViewProductComponent } from './products/view-product/view-product.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    children: [
      {
        path: '',
        component: AddProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':codigoBarras',
        component: AddProductComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'product/:codigoBarras',
    component: ViewProductComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
