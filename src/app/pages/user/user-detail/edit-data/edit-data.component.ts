import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';


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


  constructor(private authService:AuthService) {
    this.authService.errorChange.subscribe((errVal) => {
      this.error = errVal;
    });
    this.authService.user.subscribe((userData) => {
      this.username = userData.username;
      this.email = userData.email;
      this.bio = userData.bio;
    });
   }

  ngOnInit(): void {
  }

  convertImage(event) {
    //scope
    const _this = this;
    
    const file:File = event.target.files[0];
    const imageRead:FileReader = new FileReader();

    imageRead.onloadend = (e) => {

     const image = new Image();
     image.src = e.target.result as string;

     function checkImageSize(res){
      image.onload = function () {
        if(image.width > 640 || image.height > 480){
         _this.error = "The image can maximum be the size of 640x480px";
          res(_this.error);
        }
        else{
          _this.error = null;
          res(_this.error);
        }
      };
     
     }
     checkImageSize(function(error){
      if(!error){
        const imageReadResult = imageRead.result as string;
        _this.onPreviewImage.emit(imageReadResult);
        _this.imageBase64 = imageReadResult;
      }
      else{
        return;
      }
    });

    }
    imageRead.readAsDataURL(file);
  }


  
  updateData(form:NgForm){
    
/*     if(!form.valid){
      return;
    } */
    const username = form.value.username;
    const email = form.value.email;
    const bio = form.value.bio;
    const image = this.imageBase64;

      this.authService.updateUserData(username,email,bio,image).subscribe(
        response => {
          console.log(response);
        },
        errorMessage=>{
          this.authService.errorChange.next(errorMessage);
          
      })
  }

}
