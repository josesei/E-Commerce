import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

import { Product } from '../product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  emptyCart = true;
  shoppingCartProducts: Array<Product>;
  //Dummy product
  dummyProduct: Product;
  //
  constructor(private shoppingCartService: ShoppingCartService) {
    this.emptyCart = this.shoppingCartService.getShoppingCartProducts().length === 0;
   }

  ngOnInit() {
//Test: delete this
//EndTest
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
