import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavComponent } from './nav/nav.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { SearchComponent } from './search/search.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotfoundComponent,
    NavComponent,
    CarouselComponent,
    FeaturedProductsComponent,
    ProductCategoriesComponent,
    SearchComponent,
    ProductPageComponent,
    ShoppingCartComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: MainComponent },
      {path: 'search', component: SearchComponent },
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'product/:id', component: ProductPageComponent},
      {path: 'cart', component: ShoppingCartComponent},
      {path: '**', component: NotfoundComponent}
    ],
      {scrollPositionRestoration: 'enabled'}
    )
  ],
  providers: [ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
