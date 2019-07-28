import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
carouselIndex;
isOnTransition;
automaticCarousel;

  constructor() {   }

  ngOnInit() {
    this.carouselIndex = 1;
    this.automaticCarousel = setInterval(() => { this.changeIndexRight(); }, 3000);
    this.transitionEffect();
  }
  ngOnDestroy() {
    clearInterval(this.automaticCarousel);
  }


  transitionEffect = function() {
    this.isOnTransition = true;
    setTimeout(() => {
      this.isOnTransition = false;
    }, 700);
  };



  changeIndexRight = function() {
    this.transitionEffect();
    if ( this.carouselIndex === 5 ) {
      this.carouselIndex = 1;
    } else {
      this.carouselIndex = this.carouselIndex + 1;
    }

  };



}
