import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupComponent } from './signup.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


describe('Component: SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;
  let httpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule,FormsModule ],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  });


  it(`should create the app'`, () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should test ErrorValidation'`, () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.debugElement.componentInstance;

    const testForm = <NgForm>{
      value: {
          username: "TestName",
          email: "test@email.com",
          password: "123"
      }
    };

    expect(app).toBeTruthy();
  });

  




  /* it(`should check if the form works as expected'`,fakeAsync((done)=> {


    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.debugElement.componentInstance;
    let authService = fixture.debugElement.injector.get(AuthService);

    authService.user.subscribe(val => {
      console.log(val);
      expect(val.username).toEqual("TestName");
      done();
  })   

    const testForm = <NgForm>{
      value: {
          username: "TestName",
          email: "test@email.com",
          password: "123"
      }
    };

    let httpClient = TestBed.inject(HttpClient);
    httpClient
    .post("http://localhost:3000/api/users",{testForm})
    .subscribe(_ => console.log("Good"), err => console.log(err));
    console.log('111111111111');

    //app.onRegister(testForm);
    fixture.detectChanges();
    tick(100);

  }))
 */
});
