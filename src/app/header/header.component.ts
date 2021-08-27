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

  countDownInterval:any;
  countdownVal:string;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isLoggedIn = !user ? false : true;
      if(user)
        this.countDown(user.token);
    });
    
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.cleanCountDown();
  }

  logout(){
    this.authService.logout();
    this.cleanCountDown();
  }

  countDown(token){
      // Update the count down every 1 second
      if(token){
        this.countDownInterval = setInterval(()=>{
            let timeLeft = this.authService.getTokenExpiration(token)-Date.now();
            let countdown =this.formatTimer(timeLeft);
            this.countdownVal = countdown;
            
            if(timeLeft<1000){
                this.cleanCountDown();
            }
        },1000) 
      }
      else{
        this.cleanCountDown();
      }
  }

  formatTimer(tokenExpirationDate){
      let totalSeconds = tokenExpirationDate/1000;
      let hours = Math.floor(totalSeconds / 3600);
                             totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      let hoursFormatted = hours>9 ? hours : `0${hours}`;
      let minutesFormatted = minutes>9 ? minutes : `0${minutes}`;
      let secondsFormatted = seconds>9 ? seconds : `0${seconds}`;

        return ( hoursFormatted + ":" + minutesFormatted + ":"+ secondsFormatted);

  }

  cleanCountDown(){
    
      if (this.countDownInterval) {
        clearInterval(this.countDownInterval);
      }
      this.countdownVal = null;
      this.countDownInterval = null;
  }

}
