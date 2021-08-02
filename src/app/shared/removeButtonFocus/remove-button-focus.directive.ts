import {Directive, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: 'button', // your selectors here!
  
})

export class RemoveButtonFocusDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('click') onClick() {
    this.elRef.nativeElement.blur();
  }
}