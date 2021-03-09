import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrTplOutletDirective } from './str-tpl-outlet.directive';



@NgModule({
  declarations: [StrTplOutletDirective],
  exports: [StrTplOutletDirective]
})
export class DirectivesModule { }
