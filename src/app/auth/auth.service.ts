import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, ReplaySubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface authResponseData{
    user: {
            id:number,
            username: string,
            email: string,
            bio: string,
            token: string,
            image: string,
    };
}


@Injectable({providedIn: 'root'})
export class AuthService{
    public errorChange: Subject<string> = new Subject<string>();
    public user = new ReplaySubject<User>(1);

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
                    this.handleLogin(
                        resData.user.username,
                        resData.user.image,
                        resData.user.bio,
                        resData.user.email,
                        resData.user.id,
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
                    this.handleLogin(
                        resData.user.username,
                        resData.user.image,
                        resData.user.bio,
                        resData.user.email,
                        resData.user.id,
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

    private handleLogin(username:string,image:string,bio:string,email:string,id:number,token:string){
        const user = new User(username,bio,image,email,id,token)
        this.user.next(user);
       
        
    }

    private handleError(errorRes: HttpErrorResponse){

        console.log(errorRes);
        console.log(errorRes.error.message);
/*         if(errorRes.error.message){
            errorMessage = errorRes.error.message;
        } */


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

    public getToken(){
        this.user.subscribe((val) => {
            return val.token;
          });   
    }



    //User
    public getUserInfo(){
        return this.http.get<authResponseData>('http://localhost:3000/api/user')
    }

    public updateUserData(username:string,email:string,bio:string,image:string){

        return this.http.put<authResponseData>('http://localhost:3000/api/user',
        {
            username:username,
            email:email,
            bio:bio,
            image:image
        })
        .pipe(
                catchError(this.handleError)  
            );
    }

    
}