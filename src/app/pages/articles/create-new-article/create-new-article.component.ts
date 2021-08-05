import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedFunctionsService } from 'src/app/shared/sharedFunctions/shared-functions.service';

@Component({
  selector: 'app-create-new-article',
  templateUrl: './create-new-article.component.html',
  styleUrls: ['./create-new-article.component.scss']
})
export class CreateNewArticleComponent implements OnInit {
  title:string;
  description:string;
  body:string;
  tags:string;
  imageData:string;
  slug:string;

  isFromEdit:boolean = false;



  constructor(private authService:AuthService,private router:Router,private sharedFunctions:SharedFunctionsService) { 

    const dataEdit = window.history.state.data;
    if(dataEdit){
      this.title = dataEdit.title
      if(!this.sharedFunctions.checkIfImage(dataEdit.description)){
        this.description = dataEdit.description
      }
      this.body = dataEdit.body
      this.slug = dataEdit.slug 
      this.tags = dataEdit.tagList.join(",")

      this.isFromEdit = true;
      console.log(this.isFromEdit);
    }
  }

  ngOnInit(): void {
  }


  updateCreateArticle(form:NgForm){
    const title = form.value.title;
    let description = form.value.description;
    const body = form.value.body;
    const tags = this.tags;
    const imageData = this.imageData;
    const slug = this.slug;

    //Hack to insert imageData instead of description
    if(imageData)
      description = imageData;

    if(!this.isFromEdit){
      //Not in edit mode
      this.authService.createArticle(title,description,body,tags).subscribe(
        response => {
          form.reset();
          this.router.navigate(['articles']);
        },
        errorMessage=>{
          this.authService.errorChange.next(errorMessage);
      })
    }
    else{
      //Edit mode
       this.authService.updateArticle(title,description,body,tags,slug).subscribe(
        response => {
          form.reset();
          this.router.navigate(['articles']);
        },
        errorMessage=>{
          this.authService.errorChange.next(errorMessage);
      }) 

    }
  }


  getTags(tagsData){
    this.tags = tagsData;
  }
  getImage(imageData){
    this.imageData = imageData;
  }

  

}
