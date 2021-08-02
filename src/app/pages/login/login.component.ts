import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles/login-signup/login-signup.scss']
})
export class LoginComponent implements OnInit {
  error:string = null;
  user:string = null


  constructor(private authService:AuthService,private router:Router) {
    this.authService.errorChange.subscribe((errVal) => {
      this.error = errVal;
    });
   }

  ngOnInit(): void {
  }

  onLogin(form:NgForm){
/*     if(!form.valid){
      return;
    } */
    const email = form.value.email;
    const password = form.value.password;

    this.authService.handleAuth(
      this.authService.login(email,password),
      'user'
    );

/*    this.authService.handleAuth(
     ,
     'user'
   ); */
  }

}
