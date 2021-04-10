import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrTplOutletDirective } from './str-tpl-outlet.directive';
import { IconDirective } from './icon/icon.directive';
import { BtnDirective } from './btn.directive';



@NgModule({
  declarations: [StrTplOutletDirective, IconDirective, BtnDirective],
  exports: [StrTplOutletDirective, IconDirective]
})
export class DirectivesModule { }
