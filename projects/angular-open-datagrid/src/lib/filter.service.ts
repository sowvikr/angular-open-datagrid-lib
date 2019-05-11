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
    let filtered;
    if (!filterOptions[column].values.length) {
      return true;
    }
    for (let i = 0; i < filterOptions[column].values.length; ++i) {
      if (filterOptions[column].operator == 'or') {
        filtered = !!filtered || filterOptions[column].comparator.call(this, data, filterOptions[column].values[i])
      }
      if (filterOptions[column].operator == 'and') {
        filtered = !filtered && filterOptions[column].comparator.call(this, data, filterOptions[column].values[i])
      }
    }
    return filtered;
  }

  filterCommon(data:Array<FilterOptions>, tableRows):FilteredData {
    let FilterRowCount = 0;
    let result:FilteredData = {tableRows: [], FilteredRowCount: 0};
    for (let i = 0; i < tableRows.length; ++i) {
      let isFiltered;
      for (let j = 0; j < data.length; ++j) {
        if (data[j] === undefined) {
          //TODO: Change the INCLUDES function to the new UTILS service.
          isFiltered = isFiltered || tableRows[i].data[j].toString().includes('');
          continue;
        }
        isFiltered = isFiltered || this.getFilteredValue(j, data, tableRows[i].data[j].toString());
      }
      tableRows[i].filteredOut = !isFiltered;
      console.log("Row: "+i, "Filtered: "+ isFiltered,"Filtered Out: "+ tableRows[i].filteredOut, "Data: "+JSON.stringify(tableRows[i].data));
      if (!tableRows[i].filteredOut) {
        FilterRowCount++;
      }
    }
    result.FilteredRowCount = FilterRowCount;
    result.tableRows = tableRows;
    return result;
  }

  filter(data:Array<FilterOptions>, tableRows):FilteredData {
    let FilterRowCount = 0;
    let result:FilteredData = {tableRows: [], FilteredRowCount: 0};
    for (let i = 0; i < tableRows.length; ++i) {
      let isFiltered = true;
      for (let j = 0; j < data.length; ++j) {
        if (data[j] === undefined) {
          //TODO: Change the INCLUDES function to the new UTILS service.
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
