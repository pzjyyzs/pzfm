import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { PagesModule } from './pages/pages.module';
import { BreadcrumbModule } from './share/components/breadcrumb/breadcrumb.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BreadcrumbModule,
    PagesModule,
    AppRoutingModule
  ],
  exports: [HeaderComponent, BreadcrumbModule, BrowserModule, AppRoutingModule]
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被appmodule引入');
    }
  }
 }
