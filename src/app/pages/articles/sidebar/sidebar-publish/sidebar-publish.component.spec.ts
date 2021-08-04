import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPublishComponent } from './sidebar-publish.component';

describe('SidebarPublishComponent', () => {
  let component: SidebarPublishComponent;
  let fixture: ComponentFixture<SidebarPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
