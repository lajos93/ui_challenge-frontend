import { Renderer2, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DropDownDirective } from './drop-down.directive';

describe('DropDownDirective', () => {
  it('should create an instance', () => {
    let fixture = TestBed.createComponent(DropDownDirective);
    // grab the renderer
    let rendererMock = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>)
    let elRefMock = {
      nativeElement: document.createElement('div')
    };
    const directive = new DropDownDirective(elRefMock,rendererMock);
    expect(directive).toBeTruthy();
  });
});
