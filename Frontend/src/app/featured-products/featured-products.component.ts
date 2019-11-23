import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../product';


@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})

export class FeaturedProductsComponent implements OnInit {
  featuredProductsUrl = "http://localhost:3000/featuredproducts";
  scrWidth: number;
  divisions: number;
  isOnTransition: boolean;
  transition: any;

  productsStorage: Product[];
  pointingToInitial: number;

  constructor(private http: HttpClient, private router: Router) {

   }

  ngOnInit() {
    this.getFeaturedProducts();

    this.pointingToInitial = 0;
    this.scrWidth = window.innerWidth;
    this.divisions = Math.floor(this.scrWidth / 370);
    if ( this.divisions < 1 ) {
      console.log("Width too small, loading the products anyways");
      this.divisions = 1;
    } else if ( this.divisions === 3 ) {
      this.divisions = 2;
    } else if ( this.divisions > 5 ) {
      this.divisions = 5;
    }
  }

  onResize( ) {
    if ( this.scrWidth !== window.innerWidth ) {
      this.pointingToInitial = 0;
      this.scrWidth = window.innerWidth;
      this.divisions = Math.floor(this.scrWidth / 300);
      if ( this.divisions < 1 ) {
        console.log("Width too small, loading the products anyways");
        this.divisions = 1;
      } else if (this.divisions === 1 ) {
        this.divisions = 1;
      } else if (this.divisions === 3 ) {
        this.divisions = 2;
      } else if (this.divisions > 5 ) {
        this.divisions = 5;
      }
    }
  }

  rotateFeatured(direction) {
    if ( direction === 'left' ) {
      if ( this.pointingToInitial === 0) {
        this.pointingToInitial = 20 - this.divisions;
      } else {
        this.pointingToInitial = this.pointingToInitial - this.divisions;
      }
    } else {
      if (this.pointingToInitial + this.divisions >= 20) {
        this.pointingToInitial = 0;
      } else {
        this.pointingToInitial = this.pointingToInitial + this.divisions;
      }
    }

    this.animation();
  }


  getFeaturedProducts() {
  this.http.get(this.featuredProductsUrl)
    .subscribe(
      (data: Product[] ) => this.productsStorage = data);
  }


  animation() {
    this.isOnTransition = true;
    this.transition = setTimeout(() => {
      this.isOnTransition = false;
    }, 700);
  }

  goToProduct(id){
    this.router.navigate(['/product', id]);
  }




}
