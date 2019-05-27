import { Injectable } from '@angular/core';

interface FilterOption {
  value:string;
  operator:any;
  comparator:any;
  isCommon?:boolean
}

interface FilterOptions {
  values:Array<FilterOption>
}

interface FilteredData {
  tableRows:Array<any>;
  FilteredRowCount:number;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  static AND(b1:boolean, b2:boolean):boolean {
    if (b1 === undefined) {
      return b2;
    }
    else if (b2 === undefined) {
      return b1;
    }
    return b2 && b1;
  }

  static OR(b1:boolean, b2:boolean):boolean {
    if (b1 === undefined) {
      b1 = !!b1;
    }
    else if (b2 === undefined) {
      b2 = !!b2;
    }

    return b2 || b1;
  }

  filterCommon(filterData:Array<FilterOptions>, tableRows):FilteredData {
    let FilterRowCount = 0;
    let result:FilteredData = {tableRows: [], FilteredRowCount: 0};
    for (let i = 0; i < tableRows.length; ++i) {
      if (tableRows[i].filteredOut) {
        continue;
      }
      let isFiltered = false;
      for (let j = 0; j < filterData.length; ++j) {
        let filtered = true;
        if(filterData[j] && filterData[j].values.length) {
          for (let k = 0; k < filterData[j].values.length; ++k) {
            if (!filterData[j].values[k].isCommon) {
              continue;
            }

            if (filterData[j] === undefined) {
              //TODO: Change the INCLUDES function to the new UTILS service.
              isFiltered = !isFiltered && tableRows[i].data[j].toString().includes('');
              continue;
            }
            let filterOption = filterData[j].values[k];
            let comparatorResult = filterOption.comparator.call(this, tableRows[i].data[j].toString(), filterData[j].values[k].value);
            filtered = filterOption.operator.call(this, filtered, comparatorResult)
          }
          isFiltered = isFiltered || filtered;
        }
      }
      tableRows[i].filteredOutCommon = !isFiltered;
      if (!tableRows[i].filteredOutCommon) {
        FilterRowCount++;
      }
    }
    result.FilteredRowCount = FilterRowCount;
    result.tableRows = tableRows;
    return result;
  }

  filter(filterData:Array<FilterOptions>, tableRows):FilteredData {
    let FilterRowCount = 0;
    let result:FilteredData = {tableRows: [], FilteredRowCount: 0};
    for (let i = 0; i < tableRows.length; ++i) {
      let isFiltered = true;
      for (let j = 0; j < filterData.length; ++j) {
        let filtered;
        if (!filterData[j] || !filterData[j].values.length) {
          filtered = true;
        }
        else {
          for (let k = 0; k < filterData[j].values.length; ++k) {
            if (filterData[j] === undefined) {
              //TODO: Change the INCLUDES function to the new UTILS service.
              isFiltered = !isFiltered && tableRows[i].data[j].toString().includes('');
              continue;
            }
            let filterOption = filterData[j].values[k];
            let comparatorResult = filterOption.comparator.call(this, tableRows[i].data[j].toString(), filterData[j].values[k].value);
            filtered = filterOption.operator.call(this, filtered, comparatorResult)
          }
          isFiltered = isFiltered && filtered;
        }
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
