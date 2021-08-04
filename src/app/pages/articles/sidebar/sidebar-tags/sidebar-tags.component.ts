import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-tags',
  templateUrl: './sidebar-tags.component.html',
  styleUrls: ['./sidebar-tags.component.scss']
})
export class SidebarTagsComponent implements OnInit {
  @Output() sideBarTagForm = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  sidebarGetData(event){
    this.sideBarTagForm.emit(event)
  }

}
