import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  shoppingCartProducts = [];

  constructor() {

   }

  addToShoppingCart(product:Product) {
    let i = 0;
    let found = false;

    while ( (i < this.shoppingCartProducts.length) && (!found) ) {
      if ( this.shoppingCartProducts[i]._id === product._id ) {
        if(this.shoppingCartProducts[i].quantityToBuy + product.quantityToBuy<=9){
          this.shoppingCartProducts[i].quantityToBuy = this.shoppingCartProducts[i].quantityToBuy + product.quantityToBuy; 
        }
        found= true;
      } 
      i++;
    }
    if(!found){
      this.shoppingCartProducts.push(product);
    }
    
  }
  getShoppingCartProducts() {
    return this.shoppingCartProducts;
  }
  changeQuantity(quantityNumber, productID) {
    if ( this.shoppingCartProducts.length !== 0) {
      this.shoppingCartProducts.forEach(product => {
        if ( productID === product._id) {
          product.quantityToBuy = parseInt(quantityNumber);
        }
      });
    }
  }
  removeProductFromShoppingCart(productID){
    let i = 0;
    let productRemoved = false;
    if(this.shoppingCartProducts.length!==0){
      while ( i < this.shoppingCartProducts.length && !productRemoved ) {
        if ( this.shoppingCartProducts[i]._id === productID ) {
          this.shoppingCartProducts.splice(i, 1);
          productRemoved = true;
        }
        i++; 
      }
    }
  }

}
