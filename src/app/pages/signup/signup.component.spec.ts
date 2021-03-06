import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupComponent } from './signup.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

describe('Component: SignupComponent', () => {
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule,FormsModule ],
      declarations: [ SignupComponent ],
      providers: [NgForm]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
  });

  it(`should create the app'`, () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fill out the form', waitForAsync(() => {
    const fixture = TestBed.createComponent(SignupComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      const formGroups = fixture.debugElement.nativeElement.querySelectorAll('.form-group');
      let emailNode;
      let usernameNode;
      let passwordNode;
      for (var i = 0, len = formGroups.length; i < len; i++) {
        let childNode = formGroups[i].children[0]
        if(childNode.innerText == "E-mail")
            emailNode = childNode.nextElementSibling
        if(childNode.innerText =="Username")
          usernameNode = childNode.nextElementSibling
        if(childNode.innerText =="Password")
          passwordNode = childNode.nextElementSibling
      }

      expect(usernameNode.value).toBe('');
      expect(emailNode.value).toBe('');
      expect(passwordNode.value).toBe('');

      usernameNode.value = 'userNameTest';
      usernameNode.dispatchEvent(new Event('input'));

      emailNode.value = 'email@test.com';
      emailNode.dispatchEvent(new Event('input'));

      passwordNode.value = '123';
      passwordNode.dispatchEvent(new Event('input'));

      expect(fixture.componentInstance.usernameVal).toBe('userNameTest');
      expect(fixture.componentInstance.emailVal).toBe('email@test.com');
      expect(fixture.componentInstance.passwordVal).toBe('123');
    });
  }));

});
