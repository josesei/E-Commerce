import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchValue: String;
  pageValue: Number;
  searchProducts: any[];

  searchURL="http://localhost:3000/search/";

  
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams)=>{
      this.searchValue = queryParams.searchValue;
      this.pageValue = parseInt(queryParams.pageValue);
      this.getProductsPage(this.searchValue, this.pageValue);
    });


  }

  getProductsPage(searchValue:String, page:Number) {
    this.http.get(this.searchURL + searchValue + "/" + page.toString)
      .subscribe(
        (data: any ) => this.searchProducts = data);

  }

  goToProduct(id){
    this.router.navigate(['/product', id]);
  }

}
