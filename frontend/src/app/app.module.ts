import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule,FormModule,FooterModule,CarouselModule } from '@coreui/angular';
import { NavbarModule, BadgeModule, CollapseModule,NavModule, DropdownModule ,GridModule, CardModule} from '@coreui/angular';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryService } from './services/category.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SidebarCategoryComponent } from './components/sidebar-category/sidebar-category.component';
import { SidebarModule } from '@coreui/angular';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { CartComponent } from './components/cart/cart.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    SidebarCategoryComponent,
    ProductCategoryComponent,
    AdminComponent,
    SidebarAdminComponent,
    CartComponent,
 

  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavbarModule,
    BadgeModule,
    CollapseModule,
    NavModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    FooterModule,
    CarouselModule,
    CarouselComponent,
    HttpClientModule,
    CardModule,
    SidebarModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }