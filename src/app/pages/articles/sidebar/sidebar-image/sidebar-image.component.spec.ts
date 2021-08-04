import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarImageComponent } from './sidebar-image.component';

describe('SidebarImageComponent', () => {
  let component: SidebarImageComponent;
  let fixture: ComponentFixture<SidebarImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
