import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedFunctionsService } from 'src/app/shared/sharedFunctions/shared-functions.service';

@Component({
  selector: 'app-sidebar-image',
  templateUrl: './sidebar-image.component.html',
  styleUrls: ['./sidebar-image.component.scss']
})
export class SidebarImageComponent implements OnInit {
  @Output() sideBarImage= new EventEmitter;

  constructor(private sharedFunctions:SharedFunctionsService) { }

  ngOnInit(): void {
  }

  sidebarGetData(event){
    this.sharedFunctions.convertImage(event);
    this.sharedFunctions.onPreviewImage.subscribe((imageBase64) => {
      this.sideBarImage.emit(imageBase64)
    });
  }

}
