import { Injectable } from '@angular/core';
interface FilterOptions {
  operator: string;
  values: string[];
  comparator: any;
}

interface FilteredData {
  tableRows:Array<any>;
  FilteredRowCount:number;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private getFilteredValue(column:number, filterOptions:Array<FilterOptions>, data:string) {
    let filtered = false;
    if (!filterOptions[column].values.length) {
      return true;
    }
    for (let i = 0; i < filterOptions[column].values.length; ++i) {
      if (filterOptions[column].operator == 'or') {
        filtered = filtered || filterOptions[column].comparator.call(this, data, filterOptions[column].values[i])
      }
    }
    return filtered;
  }

  filter(data:Array<FilterOptions>, tableRows):FilteredData {
    let FilterRowCount = 0;
    let result:FilteredData = {tableRows: [], FilteredRowCount: 0};
    for (let i = 0; i < tableRows.length; ++i) {
      let isFiltered = true;
      for (let j = 0; j < data.length; ++j) {
        if (data[j] === undefined) {
          isFiltered = isFiltered && tableRows[i].data[j].toString().includes('');
          continue;
        }
        isFiltered = isFiltered && this.getFilteredValue(j, data, tableRows[i].data[j].toString());
      }
      tableRows[i].filteredOut = !isFiltered;
      if (!tableRows[i].filteredOut) {
        FilterRowCount++;
      }
    }
    result.FilteredRowCount = FilterRowCount;
    result.tableRows = tableRows;
    return result;
  }

  constructor() {
  }
}
