import { EventEmitter } from '@angular/core';
import { Component, ElementRef, HostBinding, Input, OnChanges, Output, Renderer2, SimpleChange, SimpleChanges, ViewEncapsulation } from '@angular/core';

const ColorPresets = ['magenta', 'orange', 'green'];
type TagMode = 'default' | 'circle';
@Component({
  selector: 'fm-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TagComponent implements  OnChanges {

  @Input() fmColor = '';
  @Input() fmShape: TagMode = 'default';
  @Input() fmClosable = false;
  @Output() closed = new EventEmitter<void>();
  @HostBinding('class.fm-tag') readonly hostCls = true;
  @HostBinding('class.fm-tag-circle') get circleCls(): boolean { return this.fmShape === 'circle'; }
  @HostBinding('class.fm-tag-close') get closeCls(): boolean { return this.fmClosable; }

  private currentPresetCls = '';
  constructor(private el: ElementRef, private rd2: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.setStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setStyle(changes.fmColor);
  }

  private setStyle(color: SimpleChange): void {
    const hostEl = this.el.nativeElement;
    if (!hostEl || !this.fmColor) {
      return ;
    }

    if (this.currentPresetCls) {
      this.rd2.removeClass(hostEl, this.currentPresetCls);
      this.currentPresetCls = '';
    }
    if (ColorPresets.includes(this.fmColor)) {

      this.currentPresetCls = 'fm-tag-' + this.fmColor;
      this.rd2.addClass(hostEl, this.currentPresetCls);
      this.rd2.removeStyle(hostEl, 'color');
      this.rd2.removeStyle(hostEl, 'border-color');
      this.rd2.removeStyle(hostEl, 'background-color');
    } else {
      this.rd2.setStyle(hostEl, 'color', '#fff');
      this.rd2.setStyle(hostEl, 'border-color', 'transparent');
      this.rd2.setStyle(hostEl, 'background-color', color.currentValue);
    }
  }
}
