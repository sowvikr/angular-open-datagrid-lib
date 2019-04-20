import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtilsService {

  /**
   *
   * @param s
   * @param c
     */
  static equals(s:string, c:any):boolean {
    if(typeof (c) !== "string"){
      c = c.toString();
    }
    return s.toLowerCase() == c.toLowerCase();
  }

  /**
   * 4
   * @param s
   * @param c
   * @param p
   */
  static includes(s:string, searchString:string, position:number):boolean {
    let stringS:any = searchString;
    if (typeof (stringS) !== "string") {
      searchString = stringS.toString();
    }
    let k = s.toLowerCase().match(searchString.toLowerCase());
    if (position && k) {
      return k.index === position;
    }
    return !!k;

  }

  constructor() {
  }
}
