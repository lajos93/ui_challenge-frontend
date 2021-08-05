import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-tags',
  templateUrl: './sidebar-tags.component.html',
  styleUrls: ['./sidebar-tags.component.scss']
})
export class SidebarTagsComponent implements OnInit {
  @Output() sideBarTagForm = new EventEmitter;

  @Input("tagsFromEdit") tags;

  constructor() {
      
   }

  ngOnInit(): void {
  }

  sidebarGetData(event){
    this.sideBarTagForm.emit(event)
  }

}
