import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from './../../share/directives/directives.module';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { TagModule } from 'src/app/share/components/tag/tag.module';
import { PipesModule } from './../../share/pipes/pipes.module';


@NgModule({
  declarations: [AlbumComponent],
  imports: [
  CommonModule,
    TagModule,
    DirectivesModule,
    PipesModule,
    AlbumRoutingModule
  ]
})
export class AlbumModule { }
