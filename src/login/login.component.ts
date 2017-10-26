import {Component} from '@angular/core' ;
import { LoginService } from './login.service';

@Component({
    moduleId : module.id ,
    selector : 'app-login',
    templateUrl : 'login.component.html',
    styleUrls : ['login.component.css']
})

export class LoginComponent{


    token = ""; 
    user = {
        email : "" ,
        password : ""
    }

    constructor(private loginService : LoginService){ }

       
    onSubmit(email,password){
        this.loginService.onSubmitService(email,password)
        .subscribe((data : any)=> {
             this.token = data.json().token;
             console.log(data.json().token);
             localStorage.setItem("token",this.token);
        });
    }
}

//^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$