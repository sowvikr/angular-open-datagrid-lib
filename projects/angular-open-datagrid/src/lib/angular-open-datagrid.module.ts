/**
 * Created by Sowvik on 4/17/2019.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DataTableComponent } from './data-table/data-table.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ClickOutsideModule } from 'ng4-click-outside';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { ResizableDirective, GrabberDirective } from './resizeable';

@NgModule({
  declarations: [
    DataTableComponent,
    ContextMenuComponent,
    InlineEditComponent,
    ColumnFilterComponent,
    ResizableDirective,
    GrabberDirective
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    ClickOutsideModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  exports:[DataTableComponent],
  providers: []
})



export class AngularOpenDatagridModule { }
