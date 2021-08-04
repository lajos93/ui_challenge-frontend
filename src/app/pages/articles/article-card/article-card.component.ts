import { Component, Input, OnInit } from '@angular/core';
import { SharedFunctionsService } from 'src/app/shared/sharedFunctions/shared-functions.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  @Input('title') title; 
  @Input('body') body; 
  @Input('description') description; 

  image:string;

  constructor(private sharedFunctions:SharedFunctionsService) {
    //this.image='https://picsum.photos/200?random='+Math.floor(Math.random() * 250);
   }

  ngOnInit(): void {
    //a hack to show the image instead of the description if there is none
    if(this.description){
     if(this.sharedFunctions.checkIfImage(this.description)){
      this.image =  this.description as string;
      }
    }
  }

  

}
