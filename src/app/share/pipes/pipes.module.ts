import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from './number-format.pipe';
import { SafeContentPipe } from './safe-content.pipe';



@NgModule({
  declarations: [NumberFormatPipe, SafeContentPipe],
  exports: [NumberFormatPipe, SafeContentPipe]
})
export class PipesModule { }
