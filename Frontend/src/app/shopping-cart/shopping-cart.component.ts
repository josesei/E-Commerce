import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

import { Product } from '../product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {


  shoppingCartProducts: Product[];
  //Dummy product
  dummyProduct: Product;
  //
  constructor(private shoppingCartService: ShoppingCartService) {
    
   }

  ngOnInit() {
    this.shoppingCartProducts = this.shoppingCartService.getShoppingCartProducts();
  }

  checkOut(shoppingCartProducts) {
  }

  removeProductFromShoppingCart(productID) {
    this.shoppingCartService.removeProductFromShoppingCart(productID);
  }
  changeQuantity(quantityNumber, productID) {
    this.shoppingCartService.changeQuantity(quantityNumber, productID);
  }

}
