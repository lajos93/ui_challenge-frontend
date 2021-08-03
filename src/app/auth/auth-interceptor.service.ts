import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService:AuthService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler){

        const token = this.authService.getToken();
        if(!token){
          return next.handle(req); 
        }

        const modified = req.clone({
            setHeaders: {
              'Content-Type' : 'application/json; charset=utf-8',
              'Accept'       : 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
            return next.handle(modified);
    }

}