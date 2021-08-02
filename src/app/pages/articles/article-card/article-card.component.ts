import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  image:string;

  constructor() {
    this.image='https://picsum.photos/200?random='+Math.floor(Math.random() * 250);
   }

  ngOnInit(): void {
  }

  

}
