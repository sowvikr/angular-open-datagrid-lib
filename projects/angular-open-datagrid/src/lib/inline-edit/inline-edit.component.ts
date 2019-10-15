import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {ClipboardService} from '../clipboard.service';


interface ChangedValue {
  value: string;
  row: number;
  column: number;
}

interface ContextMenuArgs {
  x: number;
  y: number;
  isEdit: boolean;
  row: number;
  column: number;
  mouseEvent:any;
}

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})


export class InlineEditComponent implements OnInit {

  @Input() row:number;
  @Input() column:number;
  @Input() cellData:any;
  @Input() cellValue:any;
  @Input() columnDefs:any;
  @Input() renderer:any;
  @Input() isEditable:boolean;
  @Input() isSelected:boolean;
  @Output() changed = new EventEmitter<any>();
  @Output() rightClicked = new EventEmitter<ContextMenuArgs>();
  @Input() theme:string;

  @ViewChild('name', { static: false }) vc:ElementRef;

  public isEdit = false;
  public isCombobox = false;
  private changedValue:ChangedValue = {column: 0, row: 0, value: null};
  private contextMenuArgs:ContextMenuArgs = {x: 0, y: 0, isEdit: false, column: 0, row: 0, mouseEvent: null};
  public isCoping:boolean;

  handleEnterKey(event) {
    if(event.keyCode === 13){
      this.isEdit = false;
    }
  }

  onClick() {
    if (this.isEdit) {
      this.isEdit = false;
    }
  }

  onDoubleClick() {
    this.isEdit = true;
    this.vc.nativeElement.focus();
  }

  onChange(value:string) {
    this.changedValue.value = value;
    this.changedValue.row = this.row;
    this.changedValue.column = this.column;
    this.changed.emit(this.changedValue);
  }

  onRightClick(event) {
    this.contextMenuArgs.x = event.clientX;
    this.contextMenuArgs.y = event.clientY;
    this.contextMenuArgs.isEdit = this.isEdit;
    this.contextMenuArgs.row = this.row;
    this.contextMenuArgs.column = this.column;
    this.contextMenuArgs.mouseEvent = event;
    this.rightClicked.emit(this.contextMenuArgs);
  }

  onFocusOut($event) {
    this.isEdit = false;
  }

  constructor(private clipboardService:ClipboardService) {
  }

  ngOnInit() {
    if (this.cellData.length > 0) {
      this.isCombobox = true;
    }
    else {
      this.isCombobox = false;
    }
    this.clipboardService.getCopyEvent().subscribe(data => {
      if (this.isSelected) {
        this.isCoping = true;
        let that = this;
        setTimeout(function () {
          that.isCoping = false;
        }, 1000);
      }
    })

  }
}
