import { AfterViewInit, Component, ElementRef, Input, OnChanges } from '@angular/core';

interface GridLine {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  className?: string;
}

@Component({
  selector: 'app-ui-grid-helper',
  templateUrl: './ui-grid-helper.component.html',
  styleUrls: ['./ui-grid-helper.component.scss']
})
export class UiGridHelperComponent implements AfterViewInit, OnChanges {

  @Input() widthPx: number;
  @Input() heightPx: number;
  @Input() widthFr: number;
  @Input() heightFr: number;
  @Input() frUnit: number;

  gridLines: GridLine[] = [];

  constructor() { }

  ngAfterViewInit() {

  }

  ngOnChanges() {
    this.calculateGridLines();
  }

  calculateGridLines() {

    let leftPos = 0;
    for (let i = 0; i < this.widthFr; i++) {
      this.gridLines.push({
        key: `col${i}`,
        x1: leftPos,
        y1: 0,
        x2: leftPos,
        y2: this.heightPx
      });
      leftPos += this.frUnit;
    }

    let topPos = 0;
    for (let p = 0; p < this.heightFr; p++) {
      this.gridLines.push({
        key: `row${p}`,
        x1: 0,
        y1: topPos,
        x2: this.widthPx,
        y2: topPos
      });
      topPos += this.frUnit;
    }
  }

}
