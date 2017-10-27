import {Component} from '@angular/core' ;
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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

    constructor(private loginService : LoginService , private router: Router){ }

       
    onSubmit(email,password){
        this.loginService.onSubmitService(email,password)
        .subscribe((data : any)=> {
             this.token = data.json().token;
             console.log(data.json().token);
             localStorage.setItem("token",this.token);
             this.router.navigate(['/bookList']);
        });
    }
}

//^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$