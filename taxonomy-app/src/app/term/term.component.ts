import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {

  constructor(private http: Http) { }
  
  termObj:object = {};
  confirmString:string = "New term is added.";
  isAdded:boolean = false; 
  addNewTerm = function(term){
    this.termObj = {
      "term" : term.term,
      "category" : term.category
    }
    this.http.post("http://localhost:5554/terms/", this.termObj).subscribe(
      (res: Response) => {
        this.isAdded = true;
      }
    )
  }

  ngOnInit() {
  }

}
