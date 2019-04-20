import { Directive, Output,HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[ctrlKeys]'
})
export class HotKeysDirective {
  @Output() ctrlV = new EventEmitter();
  @Output() ctrlC = new EventEmitter();

  @HostListener('keydown.control.v') onCtrlV() {
    this.ctrlV.emit();
  }

  @HostListener('keydown.control.c') onCtrlC() {
    this.ctrlC.emit();
  }

  constructor() {
  }

}
