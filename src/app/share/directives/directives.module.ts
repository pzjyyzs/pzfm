import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrTplOutletDirective } from './str-tpl-outlet.directive';
import { IconDirective } from './icon/icon.directive';
import { BtnDirective } from './btn.directive';
import { ToggleMoreDirective } from './toggle-more.directive';



@NgModule({
  declarations: [StrTplOutletDirective, IconDirective, BtnDirective, ToggleMoreDirective],
  exports: [StrTplOutletDirective, IconDirective, ToggleMoreDirective]
})
export class DirectivesModule { }
