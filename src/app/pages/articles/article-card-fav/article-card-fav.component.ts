import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-card-fav',
  templateUrl: './article-card-fav.component.html',
  styleUrls: ['./article-card-fav.component.scss']
})
export class ArticleCardFavComponent implements OnInit {
  image:string;

  constructor() {
    this.image='https://picsum.photos/200?random='+Math.floor(Math.random() * 250);
   }
  ngOnInit(): void {
  }

}
