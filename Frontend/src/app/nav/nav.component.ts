import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router'; 



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  value: String;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.value = this.activatedRoute.snapshot.queryParamMap.get('searchValue');
  }

  goHomePage(){
    this.router.navigate(['/']);
  }

  search(value){
    this.router.navigate(['/search'], {queryParams: { 'searchValue' : value, 'pageValue': 1 }});
  }

}
