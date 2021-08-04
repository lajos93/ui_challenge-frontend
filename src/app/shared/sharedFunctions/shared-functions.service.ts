import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {
  public onPreviewImage: Subject<string> = new Subject<string>();
  //onPreviewImage = new EventEmitter();
  imageBase64:string;

  constructor() {
  }

  checkIfArray(val){
    if(Object.prototype.toString.call(val) === '[object Array]'){
      return true;
    }
    return false;
  }

  checkIfImage(description){
    if(!description){
      return;
    }

    if(description.substring(0,10) == 'data:image'){
      return true;
      }
    return false;

  }

  convertImage(event) {
    console.log(event);
    
    const file:File = event.target.files[0];
    const imageRead:FileReader = new FileReader();

    imageRead.onloadend = (e) => {

     const imageReadResult = imageRead.result as string;
     this.onPreviewImage.next(imageReadResult);
    }
    if(file)
      imageRead.readAsDataURL(file); 

  }
  
}
