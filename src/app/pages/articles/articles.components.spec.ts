import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticlesComponent } from './articles.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

import { Articles } from '../../../testing/data/articles-data';


describe('Component: ArticlesComponent', () => {
  let fixture: ComponentFixture<ArticlesComponent>;
  let component: ArticlesComponent;
  let authService: AuthService;
  let httpTestingController: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule,FormsModule ],
      declarations: [ ArticlesComponent ]
    })
    .compileComponents()

    authService = TestBed.inject(AuthService);
    httpTestingController= TestBed.inject(HttpTestingController);
    
  });

  it(`should create the app`, () => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });


  it(`should fetch all articles`, () => {

    authService.getAllArticles()
        .subscribe(data=>{
            expect(data).toBeTruthy("No articles returned");

            const article = data.articles.find(article => article.title == 'Title');

            expect(article.body).toBe("Example article body");
        })

        const req = httpTestingController.expectOne('http://localhost:3000/api/articles');

        console.log(req.request.url)

        expect(req.request.method).toEqual("GET");

        req.flush(Articles);

        httpTestingController.verify();

        
  });

});
