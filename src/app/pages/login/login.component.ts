import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedFunctionsService } from 'src/app/shared/sharedFunctions/shared-functions.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles/login-signup/login-signup.scss']
})
export class LoginComponent implements OnInit {
  emailVal;
  passwordVal;

  error:string = null;
  errorDesc:string = null;


  constructor(private authService:AuthService,private sharedFunctions:SharedFunctionsService) { 
    this.authService.errorChange.subscribe((errVal) => {
      if(this.sharedFunctions.checkIfArray(errVal)){
        this.error = errVal[0];
        this.errorDesc = errVal[1];
      }
      else{
        this.error = errVal;
      }      
    });
  }

  ngOnInit(): void {
  }

  onLogin(form:NgForm){
    if(!form.valid)
      return;

    const email = this.emailVal;
    const password = this.passwordVal;

    this.authService.handleAuth(
      this.authService.login(email,password),
      'user'
    );


  }

}
