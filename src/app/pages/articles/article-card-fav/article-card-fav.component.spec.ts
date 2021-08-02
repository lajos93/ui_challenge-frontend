import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardFavComponent } from './article-card-fav.component';

describe('ArticleCardFavComponent', () => {
  let component: ArticleCardFavComponent;
  let fixture: ComponentFixture<ArticleCardFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCardFavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCardFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
