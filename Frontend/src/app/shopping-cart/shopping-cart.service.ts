import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  shoppingCartProducts = [];

  constructor() {

   }

  addToShoppingCart(product) {
    this.shoppingCartProducts.push(product);
  }
  getShoppingCartProducts() {
    return this.shoppingCartProducts;
  }
  changeQuantity(quantityNumber, productID) {
    if ( this.shoppingCartProducts.length !== 0) {
      this.shoppingCartProducts.forEach(product => {
        if ( productID === product._id) {
          product.quantityToBuy = quantityNumber;
        }
      });
    }
  }
  removeProductFromShoppingCart(productID){
    let i = 0;
    let productRemoved = false;
    while ( i <= this.shoppingCartProducts.length && !productRemoved ) {
      if ( this.shoppingCartProducts[i]._id === productID ) {
        this.shoppingCartProducts.splice(i, 1);
        productRemoved = true;
      } else {
        i++;
      }
    }
  }

}
