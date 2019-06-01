import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularOpenDatagridModule} from 'angular-open-datagrid';
import {AllThemeComponent} from "./pages/all-theme/all-theme.component";
import {MaterialThemeComponent} from "./pages/material-theme/material-theme.component";
import {RedThemeComponent} from "./pages/red-theme/red-theme.component";
import {StandardThemeComponent} from "./pages/standard-theme/standard-theme.component";
import {DarkThemeComponent} from "./pages/dark-theme/dark-theme.component";

@NgModule({
  declarations: [
    AppComponent,
    DarkThemeComponent,
    StandardThemeComponent,
    RedThemeComponent,
    MaterialThemeComponent,
    AllThemeComponent,
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
