import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[fmStrTplOutlet]'
})
export class StrTplOutletDirective implements OnChanges {
  @Input() fmStrTplOutlet: TemplateRef<any> | string;
  @Input() fmStrTplOutletContext: any;
  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }
  ngOnChanges(changes: SimpleChanges): void {
    const { fmStrTplOutlet }  = changes;
    if (fmStrTplOutlet) {
      this.viewContainer.clear();
      const template = (this.fmStrTplOutlet instanceof TemplateRef) ? this.fmStrTplOutlet : this.templateRef;
      this.viewContainer.createEmbeddedView(template, this.fmStrTplOutletContext);
    }
  }

}
