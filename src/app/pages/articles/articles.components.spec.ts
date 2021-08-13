import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticlesComponent } from './articles.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

import { Articles } from '../../../testing/data/articles-data';
import { ArticleCardComponent } from './article-card/article-card.component';
import { ArticleCardSidebarComponent } from './article-card-sidebar/article-card-sidebar.component';


describe('Component: ArticlesComponent', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule,FormsModule ],
      declarations: [ ArticlesComponent, ArticleCardComponent, ArticleCardSidebarComponent]
    })
    .compileComponents()

    authService = TestBed.inject(AuthService);
    httpTestingController= TestBed.inject(HttpTestingController);

  });

  it(`should create the app`, () => {
    let fixture = TestBed.createComponent(ArticlesComponent);
    let component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  //HTTP testing

  it(`should fetch all articles`, () => {

    authService.getAllArticles()
        .subscribe(data=>{
            expect(data).toBeTruthy("No articles returned");

            const article = data.articles.find(article => article.title == 'Title');

            expect(article.body).toBe("Example article body");
        })

        const req = httpTestingController.expectOne('http://localhost:3000/api/articles');

        expect(req.request.method).toEqual("GET");

        req.flush(Articles);

        httpTestingController.verify();
     
  });

  it(`should update the article by slug`, () => {

    //test data
    const title = "test-title";
    const description = "test-description";
    const body = "test-body";
    const tagList = "test,tag,list";
    const slug = "title2 - korqkh"

    authService.updateArticle(title,description,body,tagList,slug)
        .subscribe(data=>{
            expect(data).toBeTruthy();

            expect(data.article.body).toBe("test-body");
            expect(data.article.title).toBe("test-title");
        })

        const req = httpTestingController.expectOne(`http://localhost:3000/api/articles/${slug}`);

        expect(req.request.method).toEqual("PUT");

        req.flush(
          {
            article:{
              title:title,
              slug:slug,
              description:description,
              body:body,
              created: 1628361455812,
              updated: 1628793161717,
              tagList:tagList.split(','),
              favoriteCount: 0,
              comments: []
           }
          }
        );

        httpTestingController.verify();
     
  });


  //Component testing

  it(`should list all articles`, () => {

    let fixture = TestBed.createComponent(ArticlesComponent);
    let component = fixture.debugElement.componentInstance;

    component.data = Articles;

    fixture.detectChanges();

    const cards = fixture.debugElement.nativeElement.querySelectorAll('app-article-card');

    expect(cards).toBeTruthy();

  });

  it(`should list the first article, with title,bodyText`, () => {

    let fixture = TestBed.createComponent(ArticlesComponent);
    let component = fixture.debugElement.componentInstance;

    component.data = Articles;

    fixture.detectChanges();

    const card = fixture.debugElement.nativeElement.querySelector('app-article-card');
    const title = fixture.debugElement.nativeElement.querySelector('.card-title');
    const body = fixture.debugElement.nativeElement.querySelector('.card-text');

    expect(card).toBeTruthy();

    expect(title.innerText).toBe(component.data.articles[0].title);
    expect(body.innerText).toBe(component.data.articles[0].body)

  });

});
