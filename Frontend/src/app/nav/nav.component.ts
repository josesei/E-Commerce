import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  searchValue: String;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.searchValue = this.route.snapshot.queryParamMap.get("searchValue");
    console.log(this.searchValue);
  }

  goHomePage(){
    this.router.navigate(['/']);
  }

  search(){
    this.router.navigate(['/search'], {queryParams: { 'searchValue' : this.searchValue , 'pageValue': "1" }});
  }

}
