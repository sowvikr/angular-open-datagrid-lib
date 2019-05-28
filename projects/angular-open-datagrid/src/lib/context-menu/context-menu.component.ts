import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ClipboardService} from '../clipboard.service';
import { ExportToCsv } from 'export-to-csv';
import {DataTableUtilsService} from "../data-table-utils.service";

interface MenuItem {
  text: string;
  shortcut: string;
  icon: string;
  hasOptions?: boolean;
  onClick: any;
  options?: Array<MenuItem>;
  hasSeparator?: boolean;
  enabled?: boolean;
  rowData?:Array<any>;
  columnData?:Array<any>;
  contextData?:any;
  copyFunction?:any;
  clipboardService?:any;
  onDelete?:any;
}

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  private _x = 0;
  private _y = 0;

  @Input()
  set x(mx:number) {
    let positionX = mx + 144;
    if (positionX > window.innerWidth) {
      this._x = mx - 144;
    }
    else {
      this._x = mx;
    }
  }

  get x():number {
    return this._x;
  }

  @Input()
  set y(my:number) {
    this._y = my;
  }

  get y():number {
    return this._y;
  }


  //@Input() x = 0;
  //@Input() y = 0;
  @Input() isEdit:boolean;
  @Input() contextData:any;
  @Input() theme:string;
  @Input() rowData;
  @Input() columnData:Array<any>;
  @Input() MenuItems:Array<MenuItem> = [
    {
      text: 'Copy',
      shortcut: 'Ctrl+C',
      icon: 'fa fa-copy',
      onClick($event) {
        this.copyFunction(this.contextData, this.clipboardService);
      }
    },
    {
      text: 'Paste', shortcut: 'Ctrl+V', icon: 'fa fa-paste', onClick() {
      let pasteData:Array<Array<any>> = this.clipboardService.getClipboardData();
    }
    },
    {
      text: 'Delete', shortcut: '', icon: 'fa fa-trash-o', onClick() {
      this.onDelete.delete(this.contextData);
    }
    }
    ,
     {
     text: 'Export', shortcut: ' ', icon: null, onClick() {
     let col = [];
     for (let i = 0; i < this.columnData.length; ++i) {
     col.push(this.columnData[i].headerName);
     }
     const options = {
     fieldSeparator: ',',
     quoteStrings: '"',
     decimalSeparator: '.',
     showLabels: true,
     showTitle: true,
     title: 'Data exported as CSV',
     useTextFile: false,
     useBom: true,
     headers: col
     };
     const csvExporter = new ExportToCsv(options);

     csvExporter.generateCsv(this.rowData);    }
     }
  ];
  @ViewChild('contextMenu') contextMenu:ElementRef;


  copyTextToClipboard(text, clipboardService) {
    clipboardService.copyToClipboard(text);
  }


  constructor(public clipboardService:ClipboardService, private domSanitizer:DomSanitizer, private dataTableService:DataTableUtilsService) {
  }

  ngOnInit() {
    for (let i = 0; i < this.MenuItems.length; ++i) {
      const item:MenuItem = this.MenuItems[i];
      if (item.text === 'Paste' && !this.isEdit) {
        item.enabled = true;
        item.clipboardService = this.clipboardService;
      }
      if (item.text === 'Copy') {
        item.enabled = true;
        item.contextData = this.contextData;
        item.copyFunction = this.copyTextToClipboard;
        item.clipboardService = this.clipboardService;
      }
      if (item.text === 'Delete') {
        item.enabled = true;
        item.onDelete = this.dataTableService;
        item.contextData = this.contextData;
      }
      else {
        item.enabled = true;
      }
      if (item.text === 'Export') {
        item.columnData = this.columnData;
        item.rowData = this.rowData;
      }
    }


  }

}
