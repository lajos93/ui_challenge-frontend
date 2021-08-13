import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

describe('Component: LoginComponent', () => {
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule,FormsModule ],
      declarations: [ LoginComponent ],
      providers: [NgForm]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
  });

  it(`should create the app'`, () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fill out the form', waitForAsync(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      const formGroups = fixture.debugElement.nativeElement.querySelectorAll('.form-group');
      let emailNode;
      let passwordNode;
      for (var i = 0, len = formGroups.length; i < len; i++) {
        let childNode = formGroups[i].children[0]
        if(childNode.innerText == "E-mail")
            emailNode = childNode.nextElementSibling
        if(childNode.innerText =="Password")
          passwordNode = childNode.nextElementSibling
      }

      expect(emailNode.value).toBe('');
      expect(passwordNode.value).toBe('');


      emailNode.value = 'email@test.com';
      emailNode.dispatchEvent(new Event('input'));

      passwordNode.value = '123';
      passwordNode.dispatchEvent(new Event('input'));

      expect(fixture.componentInstance.emailVal).toBe('email@test.com');
      expect(fixture.componentInstance.passwordVal).toBe('123');
    });
  }));

});
