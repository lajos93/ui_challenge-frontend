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
    public users = new BehaviorSubject<any>(null);
    public articles = new BehaviorSubject<any>(null); 

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
        let errorMessage;
        errorMessage = "Unknown error occurred"; 
        if(!errorRes.error){
            return throwError(errorMessage);
        }

        if(errorRes.error.message){
            errorMessage = errorRes.error.message;
            if(errorRes.error.errors){
                errorMessage = [errorMessage, Object.values(errorRes.error.errors)[0]];
            }
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

    public getUserID(){
        const user = this.user.getValue();
        if(user){
            return user.id;
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

    //Users
    public getAllUsers(){
        return this.http.get<any>('http://localhost:3000/api/users').pipe(
            catchError(this.handleError),
            tap(resData=>{
               this.selectCurrentUserOfAll(resData);
            })
        );
    }

    
    private selectCurrentUserOfAll(resData){
        for (let i=0; i<resData.length; i++) {
            if(resData[i].id === this.getUserID()){
              resData[i].currentUser = true;
            } 
          }
       
      this.users.next(resData)
    }


    public deletUserByEmail(email){
        return this.http.delete<ArrayBuffer>(`http://localhost:3000/api/users/${email}`).pipe(
            catchError(this.handleError)
        );
        
    }

    //Articles
    public createArticle(title:string,description:string,body:string,tagList:string){
        
        let tagListString;
        if(tagList)
            tagListString = tagList.split(',');

        return this.http.post<any>('http://localhost:3000/api/articles',
        {
            title:title,
            description:description,
            body:body,
            tagList:tagListString
        })
        .pipe(
                catchError(this.handleError) 
            );
    }

    public updateArticle(title:string,description:string,body:string,tagList:string,slug:string){
        
        const tagListString = tagList.split(',');

        return this.http.put<any>(`http://localhost:3000/api/articles/${slug}`,
        {
            title:title,
            description:description,
            body:body,
            tagList:tagListString
        })
        .pipe(
                catchError(this.handleError) 
            );
    }

    public getAllArticles(){

        return this.http.get<any>('http://localhost:3000/api/articles')
        .pipe(
                catchError(this.handleError),
                tap(resData=>{
                    this.articles.next(resData)
                 })
            );
    }

    public deleteArticle(slug:string){
        
        return this.http.delete<any>(`http://localhost:3000/api/articles/${slug}`)
        .pipe(
                catchError(this.handleError)
            );
    }

    
    public deleteSelectedArticleFromList(slug){
        const data = this.articles.getValue();
        if(data){
            for (let i=0; i<data.articles.length; i++) {
                if(data.articles[i].slug === slug){
                    const index = data.articles.indexOf(data.articles[i]);
                    data.articles.splice(index, 1);
                    
                } 
            }
        }
      this.articles.next(data)
    }
    
}