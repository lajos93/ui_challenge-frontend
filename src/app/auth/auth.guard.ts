import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.authService.getToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
