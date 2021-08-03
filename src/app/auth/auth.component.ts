import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  error:string = null;

  constructor(
      private authService : AuthService,
      private router: Router
      ) { }

  ngOnInit(): void {
  }

  onRegister(form:NgForm){
    if(!form.valid){
      return;
    }
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    
    this.manageAuth(this.authService.signup(username,email,password));

    form.reset();
  }

  onLogin(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.manageAuth(this.authService.login(email,password));

  }

  manageAuth(observable:Observable<any>){
    return observable
      .subscribe(
        response => {
          this.error = null;
          console.log(response);
          this.router.navigate(['user']);
        },
        errorMessage=>{
          console.log(errorMessage);
          this.error = errorMessage;
      })
  }

}
