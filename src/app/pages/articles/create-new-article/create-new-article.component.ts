import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  tags:[];
  imageData:string;

  constructor(private authService:AuthService,private sharedFunctions:SharedFunctionsService) { }

  ngOnInit(): void {
  }

  createNewArticle(form:NgForm){
    /*     if(!form.valid){
          return;
        } */

        const title = form.value.title;
        let description = form.value.description;
        const body = form.value.body;
        const tags = this.tags;
        const imageData = this.imageData;

        //Hack 
        if(!description)
          description = imageData;

        this.authService.createArticle(title,description,body,tags).subscribe(
          response => {
            console.log(response);
          },
          errorMessage=>{
            this.authService.errorChange.next(errorMessage);
        })
  }

  formGetData(form:NgForm){
    console.log(form.value)
  }

  getTags(tagsData){
    tagsData.split(',');
    this.tags = tagsData;
  }
  getImage(imageData){
    this.imageData = imageData;
  }





}
