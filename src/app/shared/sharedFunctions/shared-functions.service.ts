import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {

  constructor() {
  }

  checkIfArray(val){
    if(Object.prototype.toString.call(val) === '[object Array]'){
      return true;
    }
    return false;
  }
}
