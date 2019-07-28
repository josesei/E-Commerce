import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  value: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.value = this.activatedRoute.snapshot.queryParamMap.get('value');
  }

  search(value){
    this.router.navigate(['/search'], {queryParams: { 'value' : value }});
  }

}
