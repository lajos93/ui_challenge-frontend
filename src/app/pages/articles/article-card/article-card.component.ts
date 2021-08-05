import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedFunctionsService } from 'src/app/shared/sharedFunctions/shared-functions.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  @Input('i') index; 
  @Input('title') title; 
  @Input('body') body; 
  @Input('description') description; 

  @Output() editData = new EventEmitter;
  @Output() deleteData = new EventEmitter;

  image:string;

  constructor(private sharedFunctions:SharedFunctionsService) {
   }

  ngOnInit(): void {
    //a hack to show the image instead of the description if there is none
    if(this.description){
     if(this.sharedFunctions.checkIfImage(this.description)){
      this.image =  this.description as string;
      }
    }
    if(!this.image){
      this.image = this.sharedFunctions.getNoImage();
    }
  }

  editDataClick(){
    this.editData.emit(this.index)
  }

  deleteClick(){
    this.deleteData.emit(this.index)
  }

  

}
