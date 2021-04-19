import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UIGridItem } from '../data/grid.model';

@Component({
  selector: 'app-ui-grid-item',
  templateUrl: './ui-grid-item.component.html',
  styleUrls: ['./ui-grid-item.component.scss']
})
export class UiGridItemComponent implements OnInit, UIGridItem {

  constructor() { }

  @Input() key = '';
  @Input() height = 2;
  @Input() width = 2;
  @Input() x = 3;
  @Input() y = 3;

  @HostBinding('style.grid-column-start') get gridColumnStart() {
    return this.x;
  }

  @HostBinding('style.grid-column-end') get gridColumnEnd() {
    return this.x + this.width;
  }

  @HostBinding('style.grid-row-start') get gridRowStart() {
    return this.y;
  }

  @HostBinding('style.grid-row-end') get gridRowEnd() {
    return this.y + this.height;
  }

  ngOnInit() {
  }

}
