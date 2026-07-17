import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { CartComponent } from './components/cart/cart.component';
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'}, // mặc định trang home
  {path: 'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'product/:id', component: ProductDetailComponent},
  { path: 'category/:categoryId', component: ProductCategoryComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
