import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersComponent } from './users.component';
import { FormsModule, NgForm } from '@angular/forms';



describe('Component: UsersComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ UsersComponent ]
    })
    .compileComponents();
  });


  it(`should create the app'`, () => {
    const fixture = TestBed.createComponent(UsersComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
})
