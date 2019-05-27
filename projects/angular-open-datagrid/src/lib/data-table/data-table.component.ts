import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {filter} from 'rxjs/internal/operators/filter';
import {ClipboardService} from '../clipboard.service';
import {FilterService} from '../filter.service';
import {StringUtilsService} from '../string-utils.service';
import {sequenceEqual} from 'rxjs/internal/operators/sequenceEqual';
import {DataTableUtilsService} from '../data-table-utils.service';
import {CdkDragEnter} from '@angular/cdk/typings/esm5/drag-drop';

// Cell renderer interface.
interface CellRenderer {
  cellRender?(row:number, column:number, data:any, columnDefs:Column[]): string;
}

// interface for columns
interface FilterOption {
  value:string;
  operator:any;
  comparator:any;
  isCommon?: boolean;
}

interface FilterOptions {
  values:Array<FilterOption>
}
interface Column extends CellRenderer {
  headerName: string;
  field: string;
  width: string;
  sortState?: boolean;
  sort?: boolean;
  filter?: boolean;
  columnFilter?: boolean;
  uniqueFilterValues?: Array<any>;
  selectAll?: boolean;
  selectOne?: boolean;
  isEdit?: boolean;
  showFilter?: boolean;
}

// interface for each table row
interface TableRow extends CellRenderer {
  filteredOut: boolean;
  filteredOutCommon: boolean;
  pageNo?: number;
  data: Array<any>;
  rowSelect?: boolean;
}

interface ContextMenuData {
  row: number;
  column: number;
  data: any;
}

@Component({
  selector: 'data-grid',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss',
    './data-table.component-dark.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(28px)', opacity: 0, height: '28px'}),
          animate('200ms', style({transform: 'translateY(0)', opacity: 1, height: '0'}))
        ]),
        transition(':enter', [
          style({transform: 'translateY(0)', opacity: 0, height: '0'}),
          animate('200ms', style({transform: 'translateY(28px)', opacity: 1, height: '28px'}))
        ])
      ]
    )
  ]
})
export class DataTableComponent implements OnInit {

  @Input() pagination;
  private pageSize;
  public dragTheme;

  @Input() theme;
  @Input() columnDefs:Column[];
  @Input() rowData;
  @Input() rowSelection:boolean = true;
  @Input()commonSearch:boolean = false;
  public isMoving:boolean = false;
  private clientWidth;
  public Moved:Array<any> = [];
  private math = Math;
  private TableRows:TableRow[] = [];
  public FilterRowCount:number;
  public TotalPages:number;
  public PagedRows:TableRow[] = [];
  public CurrentPage = 1;
  private InvalidPage = 0;
  public FromRecord = 1;
  public ToRecord:number = 0;
  private FilterData:Array<FilterOptions>;
  public TotalRows:number;
  private FilteredRows:TableRow[] = [];
  public contextmenu:boolean;
  public contextmenuX = 0;
  private previousIndex;
  public contextmenuY = 0;
  public filterMenuX = 0;
  private filterMenuY = 0;
  public contextMenuData:Array<Array<any>> = [];
  public contextMenuIsEdit:boolean;
  private isDragging:boolean;
  public rowSizes = [25, 50, 75, 100];
  public selectAllRows:boolean = false;

  // Convert row data to a 2D array.
  createTableData1(filteredData?:Array<any>, currentPage?:number) {
    this.TableRows = new Array<any>();
    this.contextMenuData = [];
    if (!(this.rowData && this.rowData.length)) {
      this.rowData = [];
    }
    else if (this.columnDefs.length !== Object.keys(this.rowData[0]).length) {
      console.warn('Invalid data: Total Column in def: ' + this.columnDefs.length + 'Total Columns in data:'
        + Object.keys(this.rowData[0]).length);
    }
    for (let j = 0; j < this.rowData.length; ++j) {
      const row:TableRow = {data: [], filteredOut: false, filteredOutCommon: false};
      for (let i = 0; i < this.columnDefs.length; ++i) {
        if (!(filteredData && filteredData.length !== 0 && currentPage > 0)) {
          this.columnDefs[i].sortState = null;
          this.columnDefs[i].showFilter = false;
        }
        row.cellRender = this.cellRenderer;
        row.data.push(this.rowData[j][this.columnDefs[i].field]);
        if (this.rowSelection) {
          row.rowSelect = false;
        }
      }
      this.TableRows.push(row);
      this.FilteredRows.push(row);
    }

    this.generateUniqueFilters();

    if (filteredData && filteredData.length !== 0 && currentPage > 0) {
      this.applyFilter(this.FilterData, this.TableRows);
      this.setPagedRow(currentPage);
      for (let i = 0; i < this.columnDefs.length; ++i) {
        if (this.columnDefs[i].sortState !== null) {
          this.applySort(i, this.columnDefs[i].sortState);
        }
      }
    } else {
      this.pagedRows();
      this.setPagedRow(1);
    }
  }

  private allRows(isSelect) {
    for (let i = 0; i < this.TableRows.length; ++i) {
      this.TableRows[i].rowSelect = isSelect;
      if (isSelect) {
        if (!(this.contextMenuData[i] && this.contextMenuData[i].length)) {
          this.contextMenuData[i] = [];
        }
        this.contextMenuData[i] = this.TableRows[i].data;
      }
    }
    if (!isSelect) {
      this.contextMenuData = [];
    }
  }


  private selectRows(selected:boolean, rowNumber:number, isAll?:boolean) {
    let row = this.PagedRows[rowNumber];
    if (isAll) {
      this.allRows(selected);
      return;
    }
    if (row.rowSelect && selected) {
      if (!(this.contextMenuData[rowNumber] && this.contextMenuData[rowNumber].length)) {
        this.contextMenuData[rowNumber] = [];
      }
      this.contextMenuData[rowNumber] = this.PagedRows[rowNumber].data;
    }
    else if (!selected) {
      this.contextMenuData[rowNumber] = [];
    }
  }

  public checkedRowSelection(event, isHeader) {
    if (isHeader) {
      this.selectRows(event.target.checked, null, true);
      return;
    }
    if (!event.value) {
      this.selectAllRows = false;
    }
    this.PagedRows[event.row].rowSelect = event.value;
    this.selectRows(event.value, event.row);
  }

  private generateUniqueFilters() {
    for (let i = 0; i < this.columnDefs.length; ++i) {
      this.createColumnFilter(this.columnDefs[i], this.TableRows, i);
    }
  }

  private createColumnFilter(column:Column, rows:Array<TableRow>, columnNumber:number) {
    const uniqueItems:Array<any> = [];
    column.uniqueFilterValues = [];
    if (!column.columnFilter) {
      return;
    }
    for (let i = 0; i < rows.length; ++i) {
      if (rows[i].filteredOut || rows[i].filteredOutCommon) {
        continue;
      }
      const columnValue = rows[i].data[columnNumber];
      if (uniqueItems.indexOf(columnValue) < 0) {
        uniqueItems.push(columnValue);
        column.uniqueFilterValues.push({checked: false, filteredOut: false, data: [columnValue]});

        this.FilterData[columnNumber] = this.FilterData[columnNumber] || {values: []};
        this.FilterData[columnNumber].values.push({
          comparator: StringUtilsService.includes,
          operator: FilterService.OR,
          value: columnValue
        });
      }
    }
    //column.uniqueFilterValues = uniqueItems;
  }


  private pagedRows() {
    let j = 0;
    for (let i = 0; i < this.TableRows.length; ++i) {
      const row:TableRow = this.TableRows[i];
      if (row.filteredOut || row.filteredOutCommon) {
        row.pageNo = 0;
        continue;
      }
      if (this.pagination) {
        row.pageNo = Math.ceil((j + 1) / this.pageSize);
      } else {
        row.pageNo = 1;
      }
      j++;
    }
  }

  private setPagedRow(pageNo:number) {
    this.PagedRows = [];
    for (let j = 0; j < this.TableRows.length; ++j) {
      const row:TableRow = this.TableRows[j];
      if (row.pageNo === this.InvalidPage) {
        continue;
      }
      if (row.pageNo === pageNo) {
        this.PagedRows.push(row);
      }
    }
  }

  private cellRenderer(row:number, column:number, data:any, columnDefs:Column[]) {
    if (columnDefs[column].cellRender === undefined && (typeof (columnDefs[column].cellRender) !== 'function')) {
      return data;
    } else {
      return columnDefs[column].cellRender(row, column, data, columnDefs);
    }
  }

// Filters data based on CONTAINS.
  filter(column, text) {
    this.FilterData[column] = this.FilterData[column] || {values: []};
    this.FilterData[column].values = [{
      operator: FilterService.OR,
      value: text,
      comparator: StringUtilsService.includes
    }];
    this.applyFilter(this.FilterData, this.TableRows);
  }

  /*
   private getFilteredValue(column:number, filterOptions:Array<FilterOptions>, data:string) {
   let filtered = false;
   if (!filterOptions[column].values.length) {
   return true;
   }
   for (let i = 0; i < filterOptions[column].values.length; ++i) {
   if (filterOptions[column].operator == 'or') {
   filtered = filtered || filterOptions[column].comparator.call(data, filterOptions[column].values[i])
   }
   }
   return filtered;
   }
   */


  private applyFilter(filterData:Array<FilterOptions>, tableRows:Array<any>) {
    let result = this.filterService.filter(filterData, tableRows);
    this.FilterRowCount = result.FilteredRowCount;
    tableRows = result.tableRows;
    this.pagedRows();
    this.setPagedRow(1);
    this.updateTotalPageCount();
    this.contextMenuData = [];
  }

  /**
   * Called If any Unique valiue checkbox use for filter the column.
   * @param filterEventArgs
   */
  checkedColumnFilter(filterEventArgs) {

    this.FilterData[filterEventArgs.column].values = [];
    for (let i = 0; i < filterEventArgs.filteredData.length; ++i) {
      this.FilterData[filterEventArgs.column].values.push({
        comparator: StringUtilsService.equals,
        operator: FilterService.OR,
        value: filterEventArgs.filteredData[i]
      });
    }
    this.applyFilter(this.FilterData, this.TableRows);
  }

  updateTotalPageCount() {
    this.TotalPages = Math.ceil(this.FilterRowCount / this.pageSize);
    this.FromRecord = 1;
    this.TotalRows = this.FilterRowCount;
    if (this.FilterRowCount < this.pageSize) {
      this.ToRecord = this.FilterRowCount;
    } else {
      this.ToRecord = this.pageSize;
    }
  }

  // Nevigate to Next Page
  nextPage() {
    this.CurrentPage++;
    this.FromRecord += this.pageSize;
    this.ToRecord += this.pageSize;
    if (this.ToRecord > this.rowData.length) {
      this.ToRecord = this.rowData.length;
    }
    this.setPagedRow(this.CurrentPage);
  }

  // Nevigate to Previous page
  previousPage() {
    this.CurrentPage--;
    this.FromRecord -= this.pageSize;
    this.ToRecord -= this.pageSize;
    this.setPagedRow(this.CurrentPage);
  }

  // Nevigate to Last page
  lastPage() {
    this.ToRecord = this.FilterRowCount;
    this.CurrentPage = this.TotalPages;
    this.setPagedRow(this.CurrentPage);
    this.FromRecord = this.FilterRowCount - this.PagedRows.length + 1;
  }

  // Nevigate to First page
  firstPage() {
    this.FromRecord = 1;
    this.ToRecord = this.pageSize;
    this.CurrentPage = 1;
    this.setPagedRow(this.CurrentPage);
  }

  // Sort columns
  sortColumn(column) {
    // check whether it is sortable.
    if (!this.columnDefs[column].sort) {
      return;
    }
    // Reset all other sort
    for (let i = 0; i < this.columnDefs.length; ++i) {
      if (i === column) {
        continue;
      }
      this.columnDefs[i].sortState = null;
    }

    // cache the sort state
    let sortState:boolean = this.columnDefs[column].sortState;
    if (sortState == null) {
      this.columnDefs[column].sortState = true;
    } else {
      this.columnDefs[column].sortState = !this.columnDefs[column].sortState;
    }
    sortState = this.columnDefs[column].sortState;
    this.applySort(column, sortState);
  }

  //
  private applySort(column:number, sortState:boolean) {
    const that:this = this;
    // Sort te table.
    this.TableRows.sort((a, b) => that.sortFunction(a, b, column, sortState));
    this.pagedRows();
    this.setPagedRow(this.CurrentPage);
    this.contextMenuData = [];
  }

// Sort function
  private sortFunction(a, b, columnValue, isAsc) {
    if (a.data[columnValue] === b.data[columnValue]) {
      return 0;
    } else if (isAsc) {
      return (a.data[columnValue] < b.data[columnValue]) ? -1 : 1;
    } else {
      return (a.data[columnValue] > b.data[columnValue]) ? -1 : 1;
    }
  }


  dragEnded(event) {
    this.clientWidth = event.source.element.nativeElement.offsetWidth;
  }


  drop(event) {
    this.isMoving = false;
    this.previousIndex = undefined;
    moveItemInArray(this.columnDefs, event.previousIndex, event.currentIndex);
    moveItemInArray(this.FilterData, event.previousIndex, event.currentIndex);
    this.createTableData1(this.FilterData, this.CurrentPage);

  }

  dropRow(event) {
    moveItemInArray(this.PagedRows, event.previousIndex, event.currentIndex);
    this.allRows(false);
    this.contextMenuData = [];
    this.selectAllRows = false;

  }

  valueChanged(changeValue:any) {
    this.TableRows[changeValue.row].data[changeValue.column] = changeValue.value;
    this.pagedRows();
    this.setPagedRow(this.CurrentPage);

  }

  private selectedRowsCount():number {
    let rowCount = 0;
    for (let i = 0; i < this.contextMenuData.length; ++i) {
      if (!this.contextMenuData[i]) continue;
      if (!this.contextMenuData[i].length) continue;
      rowCount++;
    }
    return rowCount;
  }


  showContextMenu(event) {
    this.contextmenuX = event.x;
    this.contextmenuY = event.y;
    if (!(this.contextMenuData[event.row] && this.contextMenuData[event.row][event.column]) && event.column !== -1) {
      this.contextMenuData = [];
      if (!this.contextMenuData[event.row]) {
        this.contextMenuData[event.row] = [];
      }
      this.contextMenuData[event.row][event.column] = this.PagedRows[event.row].data[event.column];
    }

    this.contextMenuIsEdit = event.isEdit;
    this.contextmenu = true;
  }


  private getCommonFiliterIndex(filterDataValue:Array<FilterOption>):number {
    for (let i = 0; i < filterDataValue.length; ++i) {
      if (filterDataValue[i].isCommon) {
        return i;
      }
    }
    return -1;
  }

  /**
   * On Key up common filter.
   * @param text: String to be searched across the table data.
   */
  onCommonFilter(text) {

    if (text === undefined || text === "") {
      for (let i = 0; i < this.columnDefs.length; ++i) {
        if(!this.FilterData[i]){
          continue;
        }
        let index = this.getCommonFiliterIndex(this.FilterData[i].values);
        if (index >= 0) {
          this.FilterData[i].values.splice(index, 1);
        }
      }
    }
    else {
      for (let i = 0; i < this.columnDefs.length; ++i) {
        this.FilterData[i] = this.FilterData[i] || {values: []};
        let index = this.getCommonFiliterIndex(this.FilterData[i].values);
        if (index >= 0) {
          this.FilterData[i].values[index].value = text;
        }
        else {
          this.FilterData[i].values.push({
            comparator: StringUtilsService.includes,
            operator: FilterService.AND,
            value: text,
            isCommon: true
          });
        }
      }
    }
    let result = this.filterService.filterCommon(this.FilterData, this.TableRows);
    this.FilterRowCount = result.FilteredRowCount;
    this.TableRows = result.tableRows;
    this.pagedRows();
    this.setPagedRow(1);
    this.updateTotalPageCount();
    this.contextMenuData = [];

  }


  hasData(column) {
    for (let i = 0; i < this.contextMenuData.length; ++i) {
      if (!this.contextMenuData[i]) {
        continue;
      }
      for (let j = 0; j < this.contextMenuData[i].length; ++i) {
        if (!this.contextMenuData[i][j]) {
          return true;
        }
      }
    }
    return false;
  }

  unSelectRows() {
    for (let i = 0; i < this.TableRows.length; ++i) {
      this.TableRows[i].rowSelect = false;
    }
  }

  onSelecting(rowCount, columnCount, cell, $event) {
    if (this.isDragging) {
      if (!this.contextMenuData[rowCount]) {
        this.contextMenuData[rowCount] = [];
        this.PagedRows[rowCount].rowSelect = false;
      }
      this.contextMenuData[rowCount][columnCount] = this.PagedRows[rowCount].data[columnCount];
      this.selectedRowsColumns();
    }
  }

  onClick(rowCount, columnCount, cell, $event) {
    if (this.contextMenuData[rowCount] && this.contextMenuData[rowCount][columnCount]) {
      this.contextMenuData = [];
      this.unSelectRows();
    }
    else {
      if (!$event.ctrlKey) {
        this.contextMenuData = [];
        this.unSelectRows();
      }
      if (!this.contextMenuData[rowCount]) {
        this.PagedRows[rowCount].rowSelect = false;
        this.contextMenuData[rowCount] = [];
      }
      this.contextMenuData[rowCount][columnCount] = this.PagedRows[rowCount].data[columnCount];
    }
  }


  onDragStart(row, column, $event) {

    //For left click only
    if ($event.button === 0) {
      this.contextMenuData = [];
      this.isDragging = true;
    }
  }

  private selectedRowsColumns() {
    let selectionRowStart = null;
    let selectionRowEnd = null;
    let selectionColStart = null;
    let selectionColEnd = null;
    for (let i = 0; i < this.contextMenuData.length; ++i) {
      let col = this.contextMenuData[i];
      if (!(col && col.length)) {
        continue;
      }
      if (selectionColStart === null) {
        selectionRowEnd = i;
        selectionRowStart = i;
      }
      if (i > selectionRowEnd) {
        selectionRowEnd = i;
      }
      for (let j = 0; j < col.length; ++j) {
        if (!col[j]) {
          continue;
        }
        if (selectionColStart === null) {
          selectionColStart = j;
          selectionColEnd = j;
        }
        if (j < selectionColStart) {
          selectionColStart = j;
        }
        if (j > selectionColEnd) {
          selectionColEnd = j;
        }
      }
    }
    if (selectionRowStart === null || selectionRowEnd === null
      || selectionColEnd === null || selectionColStart === null) {
      return;
    }
    for (let i = selectionRowStart; i <= selectionRowEnd; ++i) {
      for (let j = selectionColStart; j <= selectionColEnd; ++j) {
        if (!this.contextMenuData[i])
          this.contextMenuData[i] = [];
        this.contextMenuData[i][j] = this.TableRows[i].data[j];
      }
    }
  }

  onDragEnd(row, column, $event) {
//For left click only
    if ($event.button === 0) {
      this.selectedRowsColumns();
      this.isDragging = false;
    }
  }


  private animateRows(currentIndex:number, previousIndex:number, width:number) {
    this.isMoving = true;
    if (currentIndex > previousIndex) {

      let totalMove = currentIndex - previousIndex;
      let previousIndexMove = width * totalMove + 'px';
      let currentIndexMove = -1 * width + 'px';
      this.Moved[previousIndex] = 'translate3d(' + previousIndexMove + ', 0px, 0px)';
      for (let j = currentIndex; j >= previousIndex; --j) {
        if (j === previousIndex) continue;
        this.Moved[j] = 'translate3d(' + currentIndexMove + ', 0px, 0px)';
      }
    }
    else {
      let totalMove = previousIndex - currentIndex;
      let previousIndexMove = width + 'px';
      let currentIndexMove = -1 * width * totalMove + 'px';

      this.Moved[previousIndex] = 'translate3d(' + currentIndexMove + ', 0px, 0px)';
      for (let j = currentIndex; j <= previousIndex; ++j) {
        if (j === previousIndex) continue;
        this.Moved[j] = 'translate3d(' + previousIndexMove + ', 0px, 0px)';
      }
    }
    this.ref.detectChanges();
  }

  swapped(event:any) {
    let clientWidth = (event.container.element.nativeElement.clientWidth / this.columnDefs.length) - 10
    this.Moved = [];
    if (this.previousIndex === undefined)
      this.previousIndex = event.previousIndex;
    this.animateRows(event.currentIndex, this.previousIndex, clientWidth);
  }

  onContextMenuOff() {
    this.contextmenu = false;
  }


  deleteData(data:Array<Array<any>>) {
    for (let i = 0; i < data.length; ++i) {
      if (data[i] && data[i].length) {
        if (this.TableRows[i].rowSelect)
          this.rowData[i] = undefined;
      }
    }
    for (let j = 0; j < this.rowData.length; ++j) {
      if (!this.rowData[j]) {
        this.rowData.splice(j, 1);
        j--;
      }
    }
    this.contextMenuData = [];
    this.tableDraw();
  }

  pasteData(pasteData:Array<Array<any>>) {
    let pasteRow = 0, pasteColumn = 0, prevCol;
    /*
     for (let i = 0; i < this.contextMenuData.length; ++i) {
     if (!this.contextMenuData[i])
     continue;
     let row = this.contextMenuData[i];
     for (let j = 0; j < row.length; ++j) {
     if (!row[j]) {
     continue;
     }
     if (!pasteData[pasteRow][pasteColumn]) {
     pasteColumn++;
     continue;
     }
     this.PagedRows[i].data[j] = pasteData[pasteRow][pasteColumn];
     if (!prevCol) {
     prevCol = j;
     }
     else if (prevCol !== j) {
     pasteColumn++;
     prevCol = j;
     }
     }
     pasteRow++;
     }
     */
    let startRow, startColumn;
    for (let i = 0; i < this.contextMenuData.length; ++i) {
      if (!this.contextMenuData[i])
        continue;
      let row = this.contextMenuData[i];
      for (let j = 0; j < row.length; ++j) {
        if (!row[j]) {
          continue;
        }
        startRow = i;
        startColumn = j;
      }
    }
    for (let i = 0; i < pasteData.length; ++i) {
      for (let j = 0; j < pasteData[i].length; ++j) {
        let columnToBeFilled = startColumn + j;
        if (columnToBeFilled >= (this.columnDefs.length)) {
          continue;
        }
        this.PagedRows[startRow + i].data[columnToBeFilled] = pasteData[i][j];
      }
    }
  }

  onCtrlV() {
    let pasteData:Array<Array<any>> = this.clipboardService.getClipboardData();
  }

  onCtrlC() {
    this.clipboardService.copyToClipboard(this.contextMenuData);
  }

  toggleFilter(column, event) {
    let positionX = event.clientX + 135;
    if (positionX > window.innerWidth) {
      this.filterMenuX = -220;
    }
    else {
      this.filterMenuX = 25;
    }
    for (let i = 0; i < this.columnDefs.length; ++i) {
      if (i === column) continue;
      this.columnDefs[i].showFilter = false;
    }

    this.columnDefs[column].showFilter = !this.columnDefs[column].showFilter;
  }

  onRowSizeChange($event, value) {
    this.pageSize = (parseInt(value) > this.rowData.length) ? this.rowData.length : this.rowSizes[0];
    this.tableDraw();
  }

  private tableDraw() {
    this.FilterRowCount = this.rowData.length;
    this.TotalRows = this.rowData.length;
    this.FilterData = new Array<FilterOptions>(this.columnDefs.length);
    this.createTableData1();
    this.TotalPages = Math.ceil(this.rowData.length / this.pageSize);
    this.ToRecord = this.pageSize;

  }

  constructor(private clipboardService:ClipboardService, private filterService:FilterService, private dataTableService:DataTableUtilsService, private ref:ChangeDetectorRef) {
  }

  ngOnInit() {
    if (!this.theme) {
      this.theme = "standard";
    }

    this.dragTheme = this.theme + '-drag';
    this.pageSize = (this.rowSizes[0] > this.rowData.length) ? this.rowData.length : this.rowSizes[0];
    this.tableDraw();
    this.clipboardService.getPasteEvent().subscribe(data => this.pasteData(data));
    this.dataTableService.getOnDeleteEvent().subscribe(data => this.deleteData(data));
  }

}
