import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';
import { DirectivesModule } from './../../share/directives/directives.module';
import { PipesModule } from 'src/app/share/pipes/pipes.module';
import { TagModule } from 'src/app/share/components/tag/tag.module';
import { PaginationModule } from 'src/app/share/components/pagination/pagination.module';


@NgModule({
  declarations: [AlbumsComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule,
    TagModule,
    PaginationModule,
    AlbumsRoutingModule
  ]
})
export class AlbumsModule { }
