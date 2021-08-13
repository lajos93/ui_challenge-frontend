import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedFunctionsService } from 'src/app/shared/sharedFunctions/shared-functions.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../styles/login-signup/login-signup.scss']
})
export class SignupComponent implements OnInit {
  usernameVal;
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

  onRegister(form:NgForm){
    if(!form.valid)
      return;
  
    const username = this.usernameVal;
    const email = this.emailVal;
    const password = this.passwordVal;

    this.authService.handleAuth(
      this.authService.signup(username,email,password),
      'user'
    );

    form.reset();
  }

}
