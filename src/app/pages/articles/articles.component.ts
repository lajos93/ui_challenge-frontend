import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  error:string = null;
  data:any;

  constructor(private authService:AuthService) { 
    this.authService.getAllArticles().subscribe(
      res=>{},
      error=>{this.error = error}
      );
    //Get the users from the local users "Subject"
    this.authService.articles.subscribe(
      res=>{
        if(res)
          this.data = res;
          
          console.log(res)
      },
      error=>{this.error = error}
    ); 
  }

  ngOnInit(): void {
  }

}
