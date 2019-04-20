
String.prototype.equals = equals;
String.prototype.includes = includes;

interface String {
  equals: typeof equals;
  includes: typeof includes;
}

function equals(a):boolean {
  if(typeof (a) !== "string"){
    a = a.toString();
  }
  return this.toLowerCase() == a.toLowerCase();
}

function includes(searchString:string, position?:number):boolean {
  let stringS:any = searchString;
  if(typeof (stringS) !== "string"){
    searchString = stringS.toString();
  }
  let k = this.toLowerCase().match(searchString.toLowerCase());
  if (position && k) {
    return k.index === position;
  }
  return !!k;
}



