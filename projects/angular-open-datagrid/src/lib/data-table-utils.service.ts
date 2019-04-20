import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTableUtilsService {
  private onDelete:EventEmitter<any> = new EventEmitter<any>();

  getOnDeleteEvent():EventEmitter<any> {
    return this.onDelete;
  }

  delete(contextData) {
    this.onDelete.emit(contextData);
  }

  constructor() {
  }
}
