import { Component, Input, OnInit } from '@angular/core';
import { SharedFunctionsService } from 'src/app/shared/sharedFunctions/shared-functions.service';

@Component({
  selector: 'app-article-card-sidebar',
  templateUrl: './article-card-sidebar.component.html',
  styleUrls: ['./article-card-sidebar.component.scss']
})
export class ArticleCardSidebarComponent implements OnInit {
  @Input('title') title; 
  @Input('body') body; 
  @Input('description') description; 

  image:string;

  constructor(private sharedFunctions:SharedFunctionsService) {
   }
  ngOnInit(): void {
    if(this.description){
      if(this.sharedFunctions.checkIfImage(this.description)){
       this.image =  this.description as string;
       }
     }
     if(!this.image){
       this.image = this.sharedFunctions.getNoImage();
     }
  }

}
