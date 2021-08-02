import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../styles/login-signup/login-signup.scss']
})
export class SignupComponent implements OnInit {
  error:string = null;


  constructor(private authService:AuthService) { 
    this.authService.errorChange.subscribe((errVal) => {
      this.error = errVal;
    });
  }

  ngOnInit(): void {
  }

  onRegister(form:NgForm){
    if(!form.valid){
      return;
    }
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.handleAuth(
      this.authService.signup(username,email,password),
      'user'
    );

    form.reset();
  }

}
