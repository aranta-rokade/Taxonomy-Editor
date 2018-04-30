import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  terms = [];
  id: number;
  isDeleted:boolean = false;
  deleteString:string = "Term is deleted";
  private header = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  fetchData = function(){
    this.http.get('http://localhost:5554/terms').subscribe(
      (res: Response) => {
        this.terms = res.json();
      }
    )
  }

  deleteTerm = function(id){
    if(confirm('Are you sure to delete the term?')){
      const url = `${"http://localhost:5554/terms"}/${id}`;
      return this.http.delete(url, {header: this.header}).toPromise()
      .then(()=>{
          this.fetchData();
          this.isDeleted = true;
      })
    }
  }

  ngOnInit() {
    this.fetchData();
  }

}
