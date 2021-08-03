import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  user:User= null;
  imagePreview;

  constructor(private authService:AuthService) { 
    this.authService.user.subscribe((val) => {
      this.user = val;
      this.imagePreview = val.image;
    });
  }
 
  ngOnInit(){}



  previewImage(imageSource) {
    this.imagePreview = imageSource;
  }

}

