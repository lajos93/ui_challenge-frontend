import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardSidebarComponent } from './article-card-sidebar.component';

describe('ArticleCardSidebarComponent', () => {
  let component: ArticleCardSidebarComponent;
  let fixture: ComponentFixture<ArticleCardSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCardSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
