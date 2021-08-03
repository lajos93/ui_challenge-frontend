import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, throwError } from "rxjs";
import { User } from "./user.model";
import { authResponseData } from "./user.model";
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class AuthService{
    public errorChange: Subject<string> = new Subject<string>();
    public user = new BehaviorSubject<User>(null);

    constructor(private http:HttpClient,private router:Router){

    }

    public signup(username:string,email:string,password:string){
        return this.http.post<authResponseData>('http://localhost:3000/api/users',
        {
            username:username,
            email:email,
            password:password
        })
        .pipe(
                catchError(this.handleError),
                tap(resData =>{
                    this.handleRequest(
                        resData.user.id,
                        resData.user.username,
                        resData.user.email,
                        resData.user.bio,
                        resData.user.image,
                        resData.user.token)
                }) 
            );
    }

    public login(email:string,password:string){

        return this.http.post<authResponseData>('http://localhost:3000/api/login',
        {
            email:email,
            password:password
        })
        .pipe(
                catchError(this.handleError),
                tap(resData =>{
                    this.handleRequest(
                        resData.user.id,
                        resData.user.username,
                        resData.user.email,
                        resData.user.bio,
                        resData.user.image,
                        resData.user.token)
                })   
            );
    }
    

    public handleAuth(observable:Observable<any>,routerDestination){
        return observable
          .subscribe(
            response => {
              this.errorChange.next(null);
              this.router.navigate([routerDestination]);
            },
            errorMessage=>{
              this.errorChange.next(errorMessage);
              
          })
      }

    private handleRequest(id:number,username:string,email:string,bio:string,image:string,token?:string){
        if(!token)
            token = this.getToken();
        
        
        const user = new User(id,username,email,bio,image,token)
        this.user.next(user);  

    }

    private handleError(errorRes: HttpErrorResponse){

        let errorMessage = "Unknown error occurred"; 
        if(!errorRes.error){
            return throwError(errorMessage);
        }

        if(errorRes.error.message){
            errorMessage = errorRes.error.message;
        }

        else if(errorRes.error.errors){
            errorMessage = Object.keys(errorRes.error.errors)[0] + Object.values(errorRes.error.errors)[0];
        }

        return throwError(errorMessage);
    }




    //User
    public getToken(){
        const user = this.user.getValue();
        if(user){
            return user.token;
        }
        return null;
    } 

    public getUserInfo(){
        return this.http.get<authResponseData>('http://localhost:3000/api/user')
    }

    public updateUserData(username:string,email:string,bio:string,image:string){

        return this.http.put<User>('http://localhost:3000/api/user',
        {
            username:username,
            email:email,
            bio:bio,
            image:image
        })
        .pipe(
                catchError(this.handleError),
                tap(resData =>{
                    console.log(resData);
                    this.handleRequest(
                        resData.id,
                        resData.username,
                        resData.email,
                        resData.bio,
                        resData.image)
                }) 
            );
    }

    
}