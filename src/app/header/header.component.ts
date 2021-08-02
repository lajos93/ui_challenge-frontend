import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isLoggedIn = false;
  private userSub: Subscription

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isLoggedIn = !user ? false : true;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  dropdownPreventDef(event){
    event.preventDefault();
  }

}
