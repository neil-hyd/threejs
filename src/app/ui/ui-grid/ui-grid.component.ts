import { AfterViewInit, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { UIGrid } from '../data/grid.model';

@Component({
  selector: 'app-ui-grid',
  templateUrl: './ui-grid.component.html',
  styleUrls: ['./ui-grid.component.scss']
})
export class UiGridComponent implements AfterViewInit, UIGrid {

  constructor(private elRef: ElementRef<HTMLElement>) { }

  widthPx: number;
  heightPx: number;
  widthFr: number;
  heightFr: number;
  frUnit = 50;

  @HostBinding('style.grid-auto-columns.px') get columnWidth() {
    return this.frUnit;
  }

  @HostBinding('style.grid-auto-rows.px') get rowHeight() {
    return this.frUnit;
  }

  ngAfterViewInit() {

    this.widthPx = this.elRef.nativeElement.clientWidth;
    this.heightPx = this.elRef.nativeElement.clientHeight;

    this.checkParentSize();
  }

  private checkParentSize() {

    this.widthPx = this.elRef.nativeElement.clientWidth;
    this.heightPx = this.elRef.nativeElement.clientHeight;

    this.calculateFractionSize();
  }

  private calculateFractionSize() {

    this.widthFr = Math.ceil(this.widthPx / this.frUnit);
    this.heightFr = Math.ceil(this.heightPx / this.frUnit);
  }
}
