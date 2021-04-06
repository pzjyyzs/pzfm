import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';
import { DirectivesModule } from './../../share/directives/directives.module';
import { PipesModule } from 'src/app/share/pipes/pipes.module';


@NgModule({
  declarations: [AlbumsComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule,
    AlbumsRoutingModule
  ]
})
export class AlbumsModule { }
