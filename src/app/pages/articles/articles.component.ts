import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  error:string = null;
  data:any;
  sideBarData:any;

  constructor(private authService:AuthService,private router:Router) { 
    this.authService.getAllArticles().subscribe(
      res=>{},
      error=>{this.error = error}
      );
    //Get the users from the local users "Subject"
    this.authService.articles.subscribe(
      res=>{
        if(res){
          this.data = res;
          this.sideBarData = res.articles.slice(0, 2);
        }
      },
      error=>{this.error = error}
    ); 
  }

  ngOnInit(): void {
  }

  editData(index){
    console.log(this.data.articles[index])
    this.router.navigate(['edit-article'], { 
      state: { data: this.data.articles[index] } 
    });
  }

  deleteArticle(index){
    const slug = this.data.articles[index].slug;
    console.log(slug);

    this.authService.deleteArticle(slug).subscribe(
    response => {
      this.authService.deleteSelectedArticleFromList(slug)
    },
    errorMessage=>{
      this.authService.errorChange.next(errorMessage);
  }) 

  }
}
