import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { UIGrid } from '../data/grid.model';
import { UiGridServiceService } from './service/ui-grid-service.service';

@Component({
  selector: 'app-ui-grid',
  templateUrl: './ui-grid.component.html',
  styleUrls: ['./ui-grid.component.scss']
})
export class UiGridComponent implements AfterViewInit {

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private gridService: UiGridServiceService) { }

  @HostBinding('style.grid-auto-columns.px') get columnWidth() {
    return this.gridService.gridConfig$.value.gridCellSize.width;
  }

  @HostBinding('style.grid-auto-rows.px') get rowHeight() {
    return this.gridService.gridConfig$.value.gridCellSize.height;
  }

  ngAfterViewInit() {

    this.gridService.gridConfig$.subscribe(config => {
    });

    this.gridService.updateWithViewportSize({ width: this.elRef.nativeElement.clientWidth, height: this.elRef.nativeElement.clientHeight });
  }
}
