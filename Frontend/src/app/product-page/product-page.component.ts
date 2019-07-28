import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  //TERMINAR LINKEANDO LA RUTA AL PRODUCTO
  product: Product;
  productURL = "http://localhost:3000/product/";
  shippingPrice: number;
  priceString: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private shoppingCartService: ShoppingCartService ) {
    this.product = {
      _id: "",
      name: "",
      category: "",
      description: "",
      stock: 0,
      price: 0,
      weight: 0,
      img: "",
      imgDetail: "",
      quantityToBuy: 1
    };

    this.shippingPrice = 0;

   }

  ngOnInit() {
    this.getProduct();
  }

  addToCart(product) {
    this.shoppingCartService.addToShoppingCart(product);
  }

  changeQuantity(quantity){
    console.log(quantity);
    this.product.quantityToBuy = quantity;
  }

  getProductByID(id) {
    this.http.get(this.productURL + id)
      .subscribe(
        (data: Product ) => this.product = data);

  }

  getProduct() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id: string = params.get('id');
      this.getProductByID(id);
      });
  }



}
