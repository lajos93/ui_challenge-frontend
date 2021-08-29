import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, throwError } from "rxjs";
import { User } from "./user.model";
import { authResponseData } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})
export class AuthService{
    public errorChange: Subject<string> = new Subject<string>();
    public user = new BehaviorSubject<User>(null);
    public users = new BehaviorSubject<any>(null);
    public articles = new BehaviorSubject<any>(null); 
    private tokenExpirationTimer:any;

    constructor(private http:HttpClient,private router:Router){

    }

    public signup(username:string,email:string,password:string){
        return this.http.post<authResponseData>( environment.apiUrl +'/api/users',
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

        return this.http.post<authResponseData>( environment.apiUrl +'/api/login',
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

    public autoLogin(){
        const userData:{
            id:string,
            username:string,
            email:string,
            bio:string
            image:string,
            token:string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser = new User(userData.id,userData.username,userData.email,userData.bio,userData.image,userData.token)

        if(loadedUser.token){
            const remainingTime = +this.getTokenPayload(loadedUser.token).exp*1000 - +Date.now();
           this.autoLogout(remainingTime);
            this.user.next(loadedUser);
        }
    }

    public autoLogout(tokenExpirationTime:number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        },tokenExpirationTime)

    }


    public logout(){
        this.user.next(null);
        this.router.navigate(['login']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
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

    private handleRequest(id:string,username:string,email:string,bio:string,image:string,token?:string){
        if(!token)
            token = this.getToken();
        
        const user = new User(id,username,email,bio,image,token)
        this.user.next(user);  
        const decodedToken = this.getTokenPayload(token);
        this.autoLogout(+decodedToken.exp*1000-+decodedToken.iat*1000);
        localStorage.setItem('userData',JSON.stringify(user));
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
        return this.http.get<authResponseData>( environment.apiUrl +'/api/user')
    }

    public updateUserData(username:string,email:string,bio:string,image:string){

        return this.http.put<User>( environment.apiUrl +'/api/user',
        {
            username:username,
            email:email,
            bio:bio,
            image:image
        })
        .pipe(
                catchError(this.handleError),
                tap(resData =>{
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
        return this.http.get<any>( environment.apiUrl +'/api/users').pipe(
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
        return this.http.delete<ArrayBuffer>(`${environment.apiUrl}/api/users/${email}`).pipe(
            catchError(this.handleError)
        );
        
    }

    //Articles
    public createArticle(title:string,description:string,image:string,body:string,tagList:string){
        
        let tagListString;
        if(tagList)
            tagListString = tagList.split(',');

        return this.http.post<any>( environment.apiUrl +'/api/articles',
        {
            title:title,
            description:description,
            image:image,
            body:body,
            tagList:tagListString
        })
        .pipe(
                catchError(this.handleError) 
            );
    }

    public updateArticle(title:string,description:string,image:string,body:string,tagList:string,slug:string){
        
        const tagListString = tagList.split(',');

        return this.http.put<any>(`${environment.apiUrl}/api/articles/${slug}`,
        {
            title:title,
            description:description,
            image:image,
            body:body,
            tagList:tagListString
        })
        .pipe(
                catchError(this.handleError) 
            );
    }

    public getAllArticles(){

        return this.http.get<any>( environment.apiUrl +'/api/articles')
        .pipe(
                catchError(this.handleError),
                tap(resData=>{
                    this.articles.next(resData)
                 })
            );
    }

    public deleteArticle(slug:string){
        
        return this.http.delete<any>(`${environment.apiUrl}/api/articles/${slug}`)
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
        data.articlesCount = data.articlesCount-1;
        
      this.articles.next(data)
    }

    //parse token
    private getTokenPayload (token) {
        if(token){
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
         }
         return null
    };

    
    public getTokenExpiration (token) {
        if(token)
            return this.getTokenPayload(token).exp * 1000;
        return null;
    };
    
}