import { Injectable } from '@angular/core';
import {Http,Response , Headers} from '@angular/http' ;
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/do';

@Injectable()

export class BookListService{

    constructor(private _http : Http){
       console.log('task service intialized');
    }

    getListService(){
       return this._http.get("http://localhost:3000/api/books")
       .map(res => res.json())
       .do(res => console.log(res));
    }

    addBookService(params){
        console.log("Booklistservice"+params)
        let paramObj = {
            param_arr : params
        }
         return this._http.post("http://localhost:3000/api/add_book",paramObj);
         
    }

    deleteBookService(bookId){
        let paramObj = {
            bookId : bookId
        }
       return this._http.post("http://localhost:3000/api/delete_book",paramObj);
    }

    updateBookService(params_arr){
        let paramObj = {
            param_arr : params_arr
        }
       
        return this._http.post("http://localhost:3000/api/update_book",paramObj)
    }
}