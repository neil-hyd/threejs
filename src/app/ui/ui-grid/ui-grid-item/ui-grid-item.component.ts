import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { UIGridItemState } from '../store/ui-grid.model';

@Component({
  selector: 'app-ui-grid-item',
  templateUrl: './ui-grid-item.component.html',
  styleUrls: ['./ui-grid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiGridItemComponent implements OnInit {

  constructor() { }

  @Input() model: UIGridItemState;

  @HostBinding('style.grid-column-start') get gridColumnStart() {
    return this.model.x;
  }

  @HostBinding('style.grid-column-end') get gridColumnEnd() {
    return this.model.x + this.model.width;
  }

  @HostBinding('style.grid-row-start') get gridRowStart() {
    return this.model.y;
  }

  @HostBinding('style.grid-row-end') get gridRowEnd() {
    return this.model.y + this.model.height;
  }

  ngOnInit() {
  }

}
