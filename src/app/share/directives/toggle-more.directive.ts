import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
  selector: '[fmToggleMore]'
})
export class ToggleMoreDirective implements OnChanges {

  @Input() content: string;
  @Input() isFull = false;
  @Input('fmToggleMore') maxHeight = 0;
  @Output() initTrueHeight = new EventEmitter<number>();
  private fullHeight = this.maxHeight;
  constructor(private el: ElementRef, private rd2: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    const { content, isFull } = changes;
    if (content?.currentValue) {
      timer(200).subscribe(() => {
        this.fullHeight = this.hiddenDomRect(this.el.nativeElement).height;
        this.initTrueHeight.emit(this.fullHeight);
      });
    }
    if (isFull) {
      const maxHeight = isFull.currentValue ? this.fullHeight : this.maxHeight;
      this.rd2.setStyle(this.el.nativeElement, 'maxHeight', maxHeight + 'px');
    }
  }

  // 获取隐藏元素尺寸

  private hiddenDomRect(dom: HTMLElement): DOMRect {
    const cloneDom = dom.cloneNode(true) as HTMLElement;
    this.rd2.setStyle(cloneDom, 'position', 'absolute');
    this.rd2.setStyle(cloneDom, 'visibility', 'hidden');
    this.rd2.setStyle(cloneDom, 'pointerEvents', 'none');
    this.rd2.setStyle(cloneDom, 'maxHeight', 'unset');
    this.rd2.appendChild(dom.parentNode, cloneDom);
    const rect = cloneDom.getBoundingClientRect();
    this.rd2.removeChild(dom.parentNode, cloneDom);
    return rect;
  }
}
