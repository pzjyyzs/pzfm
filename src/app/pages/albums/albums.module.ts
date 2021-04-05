import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';
import { DirectivesModule } from './../../share/directives/directives.module';


@NgModule({
  declarations: [AlbumsComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    AlbumsRoutingModule
  ]
})
export class AlbumsModule { }
