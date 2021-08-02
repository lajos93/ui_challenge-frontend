import { Directive, HostListener, ElementRef,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
  isOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    let nextElement = this.el.nativeElement.nextElementSibling;
    this.isOpen = this.el.nativeElement.contains(event.target) ? !this.isOpen : false;

    if (this.isOpen === true) {
      this.renderer.addClass(nextElement, 'show');
    } else {
      this.renderer.removeClass(nextElement, 'show');
    }
  }

}
