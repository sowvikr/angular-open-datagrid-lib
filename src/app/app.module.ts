import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularOpenDatagridModule} from 'angular-open-datagrid';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularOpenDatagridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
