import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'a[fmBtn], button[fmBtn]',
  host: {
    '[class.fm-btn]': 'true'
  }
})
export class BtnDirective {

  @Input() @HostBinding('class.fm-btn-block') fmBlock = false;
  @Input() @HostBinding('class.fm-btn-circle') fmCircle = false;
  constructor() { }

}
