/**
 * Created by Sowvik on 4/7/2019.
 */
import {
  ChangeDetectionStrategy,
  SkipSelf,
  Host,
  HostListener,
  EventEmitter,
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  Directive,
} from '@angular/core';

@Directive({
  selector: '[resizable]'
})
export class ResizableDirective {
  _host:HTMLElement;
  _startWidth = 0;

  constructor(private elm:ElementRef) {
  }

  ngOnInit() {
    this._host = this.elm.nativeElement;
  }

  dragStart() {
    const style = window.getComputedStyle(this._host, undefined);
    this._startWidth = style.width ? parseInt(style.width, 10) : 0;
  }

  dragging(diff:number) {
    this._host.style.width = this._startWidth + diff + 'px';
  }

  dragEnd() {
    this._startWidth = 0;
  }
}

@Directive({
  selector: '[grabber]',
})
export class GrabberDirective {

  @HostListener('mousedown', ['$event']) mousedown = (e:MouseEvent) => {
    this._startOffsetX = e.clientX;
    document.addEventListener('mousemove', this._boundDragging);
    document.addEventListener('mouseup', this._boundDragEnd);
    this.resizable.dragStart();
  };

  _startOffsetX = 0;
  private _boundDragging = (e) => this._dragging(e);
  private _boundDragEnd = (e) => this._dragEnd(e);

  constructor(private elm:ElementRef,
              @Host() @SkipSelf() private resizable:ResizableDirective) {
  }

  private _dragging(e:MouseEvent) {
    const diff = e.clientX - this._startOffsetX;
    this.resizable.dragging(diff);
  }

  private _dragEnd(e:MouseEvent) {
    this._startOffsetX = 0;
    document.removeEventListener('mousemove', this._boundDragging);
    document.removeEventListener('mouseup', this._boundDragEnd);
    this.resizable.dragEnd();
  }
}

