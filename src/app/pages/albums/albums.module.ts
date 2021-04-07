import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';
import { DirectivesModule } from './../../share/directives/directives.module';
import { PipesModule } from 'src/app/share/pipes/pipes.module';
import { TagModule } from 'src/app/share/components/tag/tag.module';


@NgModule({
  declarations: [AlbumsComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule,
    TagModule,
    AlbumsRoutingModule
  ]
})
export class AlbumsModule { }
