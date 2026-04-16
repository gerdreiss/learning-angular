import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });

  private anchor = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective is active!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    if (window.confirm('Do you want to leave the app?')) {
      this.anchor.nativeElement.href =
        this.anchor.nativeElement.href + '?from=' + this.queryParam();
    } else {
      event.preventDefault();
    }
  }
}
