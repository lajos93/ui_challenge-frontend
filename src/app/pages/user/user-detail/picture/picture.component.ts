import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { share, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { SharedFunctionsService } from 'src/app/shared/sharedFunctions/shared-functions.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  user:User= null;
  imagePreview;

  constructor(private authService:AuthService,private sharedFunctions:SharedFunctionsService) { 
    this.authService.user.subscribe((userData) => {
      if(userData){
        this.user = userData;
        this.imagePreview = userData.image;
      }

    });

    if(!this.imagePreview)
      this.imagePreview = sharedFunctions.getNoImage();
  }
 
  ngOnInit(){}

  previewImage(imageSource) {
    this.imagePreview = imageSource;
  }

}

