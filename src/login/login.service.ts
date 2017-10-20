import {Injectable} from '@angular/core';
import { Http,Request,Response} from '@angular/http'
@Injectable( )

export class LoginService{

    constructor(private _http:Http){

    }
    onSubmitService(email,password){
           return this._http.post("http://localhost:3000/login/log_in",{email : email,password: password});
         }

}