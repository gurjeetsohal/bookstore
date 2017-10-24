import {Component} from '@angular/core' ;
import { LoginService } from './login.service';

@Component({
    moduleId : module.id ,
    selector : 'app-login',
    templateUrl : 'login.component.html',
    styleUrls : ['login.component.css']
})

export class LoginComponent{

    constructor(private loginService : LoginService){

    }
    user = {
        email : "" ,
        password : ""
    }
     
    onSubmit(){
        
    }
}