import { Injectable, EventEmitter } from '@angular/core';
import {stripComments} from "tslint/lib/utils";

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {


  private txtAreaG:any;
  private onPaste:EventEmitter<Array<Array<any>>> = new EventEmitter<Array<Array<any>>>();
  private onCopy:EventEmitter<any> = new EventEmitter<any>();

  private generateTempTextArea():any {
    const txtArea = document.createElement('textarea');
    txtArea.id = 'txt';
    txtArea.style.position = 'fixed';
    txtArea.style.top = '0';
    txtArea.style.left = '0';
    txtArea.style.opacity = '0';
    document.body.appendChild(txtArea);
    return txtArea;
  }

  private sanitize(data):string {
    return data.replace(/^\t*(.+)\t*$/, "$1")
  }

  private get2DArray(data):Array<Array<any>> {
    let array:Array<any> = data.split(/\r?\n/);
    let array2D = [[]];
    for (let i = 0; i < array.length; ++i) {
      let row = array[i].split("\t");
      if (row.length === 1 && row.indexOf("") >= 0)
        continue;
      array2D[i] = [].concat(row);
    }
    return array2D;

  }

  copyToClipboard(data:Array<Array<any>>) {
    let clipboardData:string = "";
    for (let i = 0; i < data.length; ++i) {
      if (!data[i]) {
        continue;
      }
      let row = data[i].join("\t");
      if (row === "") {
        continue;
      }
      clipboardData += this.sanitize(row) + '\n';
    }
    let txtArea;
    if (!this.txtAreaG) {
      this.txtAreaG = this.generateTempTextArea();
    }
    txtArea = this.txtAreaG;
    txtArea.value = clipboardData;
    txtArea.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      if (successful) {
        this.onCopy.emit(true);
        return true;
      }
    } catch (err) {
      console.error('Oops, unable to copy');
    } finally {
      //document.body.removeChild(txtArea);
    }
    return false;

  }

  getClipboardData():Array<Array<any>> {
    let txtArea;
    if (!this.txtAreaG) {
      this.txtAreaG = this.generateTempTextArea();
    }
    txtArea = this.txtAreaG;
    txtArea.focus();
    let result:string = '';
    try {
      //const successful = document.execCommand('paste');
      let msg:string;
      if (result = txtArea.value) {
        msg = 'successful';
      }
      else {
        msg = 'unsuccessful';
      }
    } catch (err) {
      console.error('Oops, unable to paste!');
    } finally {
      this.onPaste.emit(this.get2DArray(result));
      return this.get2DArray(result);
    }

  }

  public getPasteEvent():EventEmitter<Array<Array<any>>> {
    return this.onPaste;
  }

  public getCopyEvent():EventEmitter<any> {
    return this.onCopy;
  }

  constructor() {
  }
}
