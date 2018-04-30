import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update-term',
  templateUrl: './update-term.component.html',
  styleUrls: ['./update-term.component.css']
})
export class UpdateTermComponent implements OnInit {

  id:number;
  data:object = {};
  terms = [];
  termObj:object = {};
  valid:boolean = false;
  private header = new Headers({'Content-Type':'application/json'});


  constructor(private router:Router, private route:ActivatedRoute,
     private http:Http) { }
  
  updateTerm = function(term) {
    this.termObj = {
      'term': term.term,
      'category': term.category
    };
    const url = `${"http://localhost:5554/terms"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.termObj), {headers:this.header})
    .toPromise()
    .then(()=>{
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id =+ params['id']; 
    });
    this.http.get('http://localhost:5554/terms').subscribe(
      (res: Response) => {
        this.terms = res.json();
        for( var i=0;i<this.terms.length; i++) {
          if(parseInt(this.terms[i].id) === this.id) {
            this.valid = true;
            this.data = this.terms[i];
            break;
          } else {
            this.valid = true;
          }
        }
          
      }
    )
  }

}
