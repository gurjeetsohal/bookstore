import { Injectable } from '@angular/core';
import {Http,Response , Headers} from '@angular/http' ;
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/do';

@Injectable()

export class BookListService{

    constructor(private _http : Http){
       console.log('task service intialized');
    }

    getLists(){
       return this._http.get("http://localhost:3000/api/books")
       .map(res => res.json())
       .do(res => console.log(res));
    }

    addBookService(params){
         return this._http.post("http://localhost:3000/api/add_book",params);
    }
}