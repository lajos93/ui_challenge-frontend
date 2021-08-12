import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedFunctionsService } from 'src/app/shared/sharedFunctions/shared-functions.service';


@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {
  @Output() onPreviewImage = new EventEmitter();
  error:string;

  username:string
  email:string
  bio:string
  imageBase64:string;
  _this:any;


  constructor(private authService:AuthService,private sharedFunctions:SharedFunctionsService) {
    this.authService.errorChange.subscribe((errVal) => {
      this.error = errVal;
    });
    this.authService.user.subscribe((userData) => {
        if(userData){
          this.username = userData.username;
          this.email = userData.email;
          this.bio = userData.bio;
          this.imageBase64 = userData.image;
        }
    });
   }

  ngOnInit(): void {}

  onConvertImage(event) {
    this.sharedFunctions.convertImage(event);
    this.sharedFunctions.onPreviewImage.subscribe((imageBase64) => {
      this.onPreviewImage.emit(imageBase64)
      this.imageBase64 = imageBase64;
    });
  }


  
  updateData(form:NgForm){

    if(!form.valid){
      return;
    } 

    const username = form.value.username;
    const email = form.value.email;
    const bio = form.value.bio;
    const image = this.imageBase64;

      this.authService.updateUserData(username,email,bio,image).subscribe(
        response => {},
        errorMessage=>{
          this.authService.errorChange.next(errorMessage);
      })
  }

}
