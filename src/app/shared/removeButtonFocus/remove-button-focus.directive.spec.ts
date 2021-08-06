import { RemoveButtonFocusDirective } from './remove-button-focus.directive';

describe('RemoveButtonFocusDirective', () => {
  it('should create an instance', () => {
    let elRefMock = {
      nativeElement: document.createElement('div')
    };
    const directive = new RemoveButtonFocusDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
