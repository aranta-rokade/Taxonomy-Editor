import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories = [];
  terms =[];
  constructor(private http: Http) { }

  fetchData = function(){
    this.http.get('http://localhost:5554/terms').subscribe(
      (res: Response) => {
        this.terms = res.json();
        var cat = this.terms.reduce(function(obj,item){
          obj[item.category] = obj[item.category] || [];
          obj[item.category].push(item.term);
          return obj;
        }, {});
        this.categories = Object.keys(cat).map(function(key){
            return {category: key, terms: cat[key]};
        });
      }
    )
  }

  ngOnInit() {
    this.fetchData();
  }

}
