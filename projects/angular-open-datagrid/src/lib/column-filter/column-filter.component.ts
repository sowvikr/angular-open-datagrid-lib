import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FilterService} from '../filter.service';
import {StringUtilsService} from '../string-utils.service';
interface FilterOption {
  value:string;
  operator:any;
  comparator:any;
}

interface FilterOptions {
  values:Array<FilterOption>
}


@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss']
})
export class ColumnFilterComponent implements OnInit {

  @Input() FilterValues:Array<any> = [];
  @Input() Column;
  @Input() theme;
  @Input() renderFunction;
  @Output() OnFilterChange = new EventEmitter<any>();

  public selectAll:boolean = false;
  private selectOne:boolean = false;
  private filteredData:Array<any> = [];


  clearAll($event) {
    this.filterColumn('Select All', false);
    this.OnFilterChange.emit({filteredData: [], column: this.Column});
  }

  filterColumn(value:string, checkboxValue:boolean) {
    if (value === 'Select All' && checkboxValue) {
      this.filteredData = [];
      this.selectOne = true;
      for (let i = 0; i < this.FilterValues.length; ++i) {
        let filterValue = this.FilterValues[i];
        filterValue.checked = true;
        this.filteredData.push(filterValue.data[0]);
      }
    } else if (value === 'Select All' && !checkboxValue) {
      this.filteredData = [];
      for (let i = 0; i < this.FilterValues.length; ++i) {
        let filterValue = this.FilterValues[i];
        filterValue.checked = false;
        this.selectAll = false;
      }
      this.selectOne = false;
    } else if (checkboxValue) {
      this.filteredData.push(value);
      if (this.filteredData.length === this.FilterValues.length) {
        this.selectAll = true;
      }
    } else if (!checkboxValue) {
      const index = this.filteredData.indexOf(value);
      this.selectAll = false;
      if (index >= 0) {
        this.filteredData.splice(index, 1);
      }
    }
  }

  checkedColumnFilter(value:string, event) {

    this.filterColumn(value, event.target.checked);
    this.OnFilterChange.emit({filteredData: this.filteredData, column: this.Column});
  }

  search(text) {
    let filterOptions:Array<FilterOptions> = [];
    if (!filterOptions[0]) {
      filterOptions[0] = {values: []};
    }
    filterOptions[0].values = [{
      comparator: StringUtilsService.includes,
      operator: FilterService.OR,
      value: text
    }];
    this.FilterValues = this.filterService.filter(filterOptions, this.FilterValues).tableRows;
  }

  constructor(private filterService:FilterService) {
  }

  ngOnInit() {
  }

}
